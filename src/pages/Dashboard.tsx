import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageGallery from "../components/ImageGallery";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <h2 className="text-2xl font-bold mb-4">Manage Your Images</h2>
      <ImageUpload onUpload={() => setRefresh(!refresh)} />
      <ImageGallery key={refresh.toString()} />
    </div>
  );
};

export default Dashboard;
