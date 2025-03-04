// import { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import SearchBar from "./SearchBar";

// const ModelViewer = () => {
//   const [models, setModels] = useState([]);
//   const [filteredModels, setFilteredModels] = useState([]);

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         const response = await fetch("YOUR_BACKEND_API_URL/models"); 
//         const data = await response.json();
//         setModels(data);
//         setFilteredModels(data);
//       } catch (error) {
//         console.error("Error fetching models:", error);
//       }
//     };
//     fetchModels();
//   }, []);

//   return (
//     <div className="p-6">
//       <SearchBar models={models} setFilteredModels={setFilteredModels} />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {filteredModels.map((model) => (
//           <div key={model.id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
//             <h2 className="text-lg font-bold">{model.name}</h2>
//             <Canvas className="w-full h-64">
//               <OrbitControls />
//               <ambientLight intensity={0.5} />
//               <directionalLight position={[10, 10, 5]} />
//               <primitive object={new URL(model.url)} />
//             </Canvas>
//             <p className="text-gray-400 mt-2">{model.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ModelViewer;


// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

// const Model = ({ modelUrl }) => {
//   const { scene } = useGLTF(modelUrl);
//   return <primitive object={scene} scale={1} />;
// };

// const ModelViewer = ({ modelUrl }) => {
//   return (
//     <div className="w-full h-[600px] flex justify-center items-center bg-gray-800 rounded-lg shadow-lg">
//       <Canvas camera={{ position: [0, 2, 5] }}>
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <Suspense fallback={<span className="text-white">Loading Model...</span>}>
//           <Model modelUrl={modelUrl} />
//         </Suspense>
//         <OrbitControls />
//         <Environment preset="sunset" />
//       </Canvas>
//     </div>
//   );
// };

// export default ModelViewer;

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ modelUrl }) => {
  try {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} scale={1} />;
  } catch (error) {
    console.error("Error loading model:", error);
    return null;
  }
};

const ModelViewer = ({ modelUrl }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-[600px] flex justify-center items-center bg-gray-800 rounded-lg shadow-lg">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        onCreated={() => setLoading(false)}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {/* 3D Model */}
        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} />
        </Suspense>

        {/* Controls & Environment */}
        <OrbitControls enableZoom enablePan />
        <Environment preset="sunset" />
      </Canvas>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute text-white text-lg">Loading Model...</div>
      )}
    </div>
  );
};

export default ModelViewer;
