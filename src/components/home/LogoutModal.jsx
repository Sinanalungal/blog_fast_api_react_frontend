import React from "react";
import { IconX, IconCheck } from "@tabler/icons-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 shadow-lg w-80 md:w-96">
                <h2 className="text-lg font-semibold flex items-center">
                    <IconCheck className="h-6 w-6 text-green-600 mr-2" />
                    Confirm Logout
                </h2>
                <p className="mt-2 text-gray-600">Are you sure you want to logout?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="flex items-center mr-2 p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                        <IconX className="h-5 w-5 text-gray-500 mr-1" />
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        <IconCheck className="h-5 w-5 mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
