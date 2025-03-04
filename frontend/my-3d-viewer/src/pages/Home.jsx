import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "../components/ModelViewer";
import { Link } from "react-router-dom";

const Home = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    
    const fetchModels = async () => {
      try {
        const response = await axios.get("https://ikarus3d-backend.vercel.app/models");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
            const modelsFolder = "/models";

        const modelFiles = [
          { name: "Air Jordan", file: "air.glb", desc: "A 3D model of a Shoe" },
          { name: "Nike Air", file: "nikeair.glb", desc: "A futuristic shoe" },
          { name: "Jordan", file: "jordan.glb", desc: "A modern shoe" }
        ];
    
        // Map to the correct format
        const loadedModels = modelFiles.map(model => ({
          name: model.name,
          desc: model.desc,
          url: `${modelsFolder}/${model.file}`
        }));
    
        setModels(loadedModels);
      }
    };

    fetchModels();
  }, []);

  // useEffect(() => {
  //   // Define the models folder path (files inside /public/models)
  //   const modelsFolder = "/models";

  //   // List of model files (manually added since public files are static)
    // const modelFiles = [
    //   { name: "Air Jordan", file: "air.glb", desc: "A 3D model of a Shoe" },
    //   { name: "Nike Air", file: "nikeair.glb", desc: "A futuristic shoe" },
    //   { name: "Jordan", file: "jordan.glb", desc: "A modern shoe" }
    // ];

    // // Map to the correct format
    // const loadedModels = modelFiles.map(model => ({
    //   name: model.name,
    //   desc: model.desc,
    //   url: `${modelsFolder}/${model.file}`
    // }));

    // setModels(loadedModels);
  // }, []);

  return (
    <div className="p-4"> 
    <Link className="border-2 border-black rounded-full px-2" to={"/upload"} >Upload</Link>
      <h1 className="text-2xl font-bold mb-4 text-black">3D Model Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.length > 0 ? (
          models.map((model) => (
            <div key={model.name} className="border p-4 rounded-lg bg-gray-900">
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