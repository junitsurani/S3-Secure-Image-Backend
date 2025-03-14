import axios from "axios";

const API_URL = "http://127.0.0.1:5000/images";

interface UploadResponse {
    description: string;
    message: string;
    file_url: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No auth token found. User may be logged out.");
        alert("Authentication required.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post<UploadResponse>(`${API_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }

};

export const fetchImages = async () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API_URL}/list`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
