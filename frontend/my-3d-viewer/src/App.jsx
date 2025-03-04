import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<ModelViewer />} />
          <Route path="/upload" element={<UploadForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;