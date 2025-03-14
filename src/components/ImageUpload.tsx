import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api/images";
import { motion } from "framer-motion";

const ImageUpload = ({ onUpload }: { onUpload: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; filename: string} | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploading(true);
        try {
          const response = await uploadImage(acceptedFiles[0]); 
          setUploadedImage({
            url: response.file_url,
            filename: acceptedFiles[0].name,
          });
          onUpload();
        } catch (error) {
          alert("Upload failed!");
        } finally {
          setUploading(false);
        }
      }
    },
  });

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div {...getRootProps()} className="cursor-pointer">
        <motion.div 
            className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
        >

        <input {...getInputProps()} />
        <p className="text-gray-600 font-semibold">
          {uploading ? "Uploading..." : "Drag & Drop an image or click to upload"}
        </p>
      </motion.div>
      </div>

      {uploadedImage && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">Uploaded Image Details</h3>
          <div className="mt-3 p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-gray-700"><strong>Filename:</strong> {uploadedImage.filename}</p>
            <p className="text-gray-700">
              <strong>URL:</strong> 
              <a href={uploadedImage.url} target="_blank" className="text-blue-600 underline ml-2">
                {uploadedImage.url}
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
