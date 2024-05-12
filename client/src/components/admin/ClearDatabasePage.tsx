import React, { useState } from 'react';

const ClearDatabasePage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatched, setPasswordMatched] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === 'superadminpassword' && password === confirmPassword) {
            setPasswordMatched(true);
        } else {
            setPasswordMatched(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="h-14 flex items-center justify-center bg-red-600 rounded text-2xl font-bold text-white">Clear Database</div>
                <div className="bg-white rounded px-2 flex flex-col gap-5 pb-5">
                    <p className="text-red-500 mt-2">Warning: This action will delete all records from the database!</p>
                    <form onSubmit={handleSubmit} className="flex flex-col ">
                        <input
                            type="password"
                            placeholder="Enter Super Admin Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                            Clear Database
                        </button>
                        {passwordMatched && (
                            <p className="text-red-500 mt-2">Warning: This action will delete all records from the database!</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default ClearDatabasePage;
