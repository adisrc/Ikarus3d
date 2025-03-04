import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SearchBar from "./SearchBar";

const ModelViewer = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL/models"); 
        const data = await response.json();
        setModels(data);
        setFilteredModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []);

  return (
    <div className="p-6">
      <SearchBar models={models} setFilteredModels={setFilteredModels} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredModels.map((model) => (
          <div key={model.id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">{model.name}</h2>
            <Canvas className="w-full h-64">
              <OrbitControls />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <primitive object={new URL(model.url)} />
            </Canvas>
            <p className="text-gray-400 mt-2">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelViewer;