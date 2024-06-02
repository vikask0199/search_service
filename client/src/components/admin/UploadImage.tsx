import React, { useState } from 'react';
import { useUploadImageMutation } from '../../features/storeSlice/storeSlice';

interface UploadImageProps {
    onImageUrlChange: (imageUrl: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUrlChange }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [uploadImage, { isLoading, isError, isSuccess }] = useUploadImageMutation();
    const [imageUrls, setImageUrls] = useState("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setSelectedImage(null);
        setPreviewImage(null);
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const result = await uploadImage(formData).unwrap();
            setImageUrls(result?.imageUrl);
            onImageUrlChange(result?.imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center w-1/2 gap-5">
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {previewImage && (
                    <div className="mb-4">
                        <img src={previewImage as string} alt="Selected" className="max-w-xs max-h-48" />
                    </div>
                )}
                {previewImage && (
                    <button type="button" onClick={handleClearImage} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2">
                        Clear Image
                    </button>
                )}
                <button type="submit" onClick={handleSubmit} disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">
                    Upload Image
                </button>
            </div>
            {isError && <p className="text-red-500 mt-4">U can not submit the form before uploading the image</p>}
            {isSuccess && <p className="text-green-500 mt-4">Image uploaded successfully! {imageUrls}</p>}
        </div>
    );
};

export default UploadImage;
