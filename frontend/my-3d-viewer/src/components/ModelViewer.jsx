import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ modelUrl, setLoading }) => {
  const { scene } = useGLTF(modelUrl, true);

  useEffect(() => {
    setLoading(false); // Set loading false once the model is loaded
  }, [scene, setLoading]);

  return <primitive object={scene} scale={1} />;
};

const ModelViewer = ({ modelUrl }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-[600px] flex justify-center items-center bg-gray-800 rounded-lg shadow-lg relative">
      {loading && (
        <div className="absolute text-white text-lg">Loading Model...</div>
      )}

      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} setLoading={setLoading} />
        </Suspense>

        <OrbitControls enableZoom enablePan />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ModelViewer;