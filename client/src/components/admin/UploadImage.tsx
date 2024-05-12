import React, { useState } from 'react';

const UploadImage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="flex flex-col justify-center w-1/2">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
            />
            {selectedImage && (
                <div className="mb-4">
                    <img src={selectedImage as string} alt="Selected" className="max-w-xs max-h-48" />
                </div>
            )}
            {selectedImage && (
                <button onClick={handleClearImage} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Clear Image
                </button>
            )}
        </div>
    );
};

export default UploadImage;
