import { useState } from "react";
import { fetchImages } from "../api/images";
import { motion } from "framer-motion";

const ImageGallery = () => {
    const [images, setImages] = useState<{ id: number; filename: string; url: string; uploaded_at: string }[]>([]);

    const loadImages = async () => {
        try {
            const response = await fetchImages();
            setImages(response.data);
        } catch (error) {
            alert("Failed to load images!");
        }
    };

    return (
        <div className="w-full max-w-2xl m-10 p-6 bg-white shadow-lg rounded-xl">
            <div className="flex justify-center">
                <motion.button
                    onClick={loadImages}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    whileTap={{ scale: 0.95 }}
                >
                    Show All Images
                </motion.button>
            </div>

            {images.length > 0 && (
                <motion.table
                    className="table-auto border-collapse border w-full mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Filename</th>
                            <th className="border p-2">Uploaded At</th>
                            <th className="border p-2">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image) => (
                            <motion.tr
                                key={image.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: image.id * 0.1 }}
                                className="hover:bg-gray-100 transition"
                            >
                                <td className="border p-2 text-center">{image.id}</td>
                                <td className="border p-2 text-center">{image.filename}</td>
                                <td className="border p-2 text-center">{new Date(image.uploaded_at).toLocaleString()}</td>
                                <td className="border p-2 text-center">
                                    <a href={image.url} target="_blank" className="text-blue-600 underline">
                                        View Image
                                    </a>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}
        </div>
    );
};

export default ImageGallery;
