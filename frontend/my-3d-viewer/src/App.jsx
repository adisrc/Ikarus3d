// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ModelViewer from "./components/ModelViewer";
// import UploadForm from "./components/UploadForm";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-900 text-white">
//         <Routes>
//           <Route path="/" element={<ModelViewer />} />
//           <Route path="/upload" element={<UploadForm/>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import ModelViewer from "./components/ModelViewer";

// const modelUrl ="/models/air.glb"

const modelUrl ='https://storage.googleapis.com/ikarus-34sd.firebasestorage.app/models/1741067651224-Air%20Jordan%201%20Low.glb?GoogleAccessId=firebase-adminsdk-fbsvc%40ikarus-34sd.iam.gserviceaccount.com&Expires=1899225000&Signature=SqUnoRaRZXbPC8LF%2BrWQqQhHQKO%2FwA9UDGzS4SydvpxaDCho%2B0wBqOCQNvs3xF1ny85jUrNBbXVuvVJkrhessKSDn3UI%2Fv8Ml32bSc58kF7b3v%2BqtNsR0g3Z86S9mKCDDuzVAwfWFWjSvCB9yiYpJVKxozdJfv50jMCgvpSg2DggFIAMzU3i3yurFvMoPUa9sesg56a2Zixy9x7cQR4DIbNgr9HNriCo9FU3WE0XfhlSpBp%2Bb2dFZyGJQOTh%2FO8Aj%2F0%2F2jwI2iwHLC2Jgpn4LWhH%2F7zWtXM3xawEUc9my1CSiaI0E8hp1xAPU%2BI0kj0IOJzWIkC%2B14SsT3c5iHSs%2BA%3D%3D'

export default function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<ModelViewer />} />
          <Route path="/upload" element={<UploadForm/>} />
        </Routes>
      </div>
    </Router>
  );
}