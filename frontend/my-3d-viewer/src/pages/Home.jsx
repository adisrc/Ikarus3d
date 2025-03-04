import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "../components/ModelViewer";

const Home = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:4000/models");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="p-4"> 
      <h1 className="text-2xl font-bold text-white mb-4">3D Model Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.length > 0 ? (
          models.map((model) => (
            <div key={model.id} className="border p-4 rounded-lg bg-gray-900">
              <h2 className="text-lg font-semibold text-white">{model.name}</h2>
              <ModelViewer modelUrl={model.url} />
              
            </div>
          ))
        ) : (
          <p className="text-white">Loading models...</p>
        )}
      </div>
    </div>
  );
};

export default Home;