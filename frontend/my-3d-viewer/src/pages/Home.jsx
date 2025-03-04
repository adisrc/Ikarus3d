import ModelViewer from "../components/ModelViewer";

function Home() {
  return (
    <div className="container">
      <h1>3D Model Viewer</h1>
      <ModelViewer modelPath="/models/https://www.dropbox.com/s/virbclod6jtlavc/Air%20Jordan%201%20Low.glb?dl=1
" />
    </div>
  );
}

export default Home;
