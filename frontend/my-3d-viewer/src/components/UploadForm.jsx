import { useState } from "react";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modelData = { name, url, description };

    try {
      const response = await fetch("YOUR_BACKEND_API_URL/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelData),
      });

      if (response.ok) {
        alert("Model uploaded successfully!");
        setName("");
        setUrl("");
        setDescription("");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading model:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload a New Model</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
          required
        />
        <input
          type="text"
          placeholder="Model URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-red-500 text-white outline-none"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Upload Model
        </button>
      </form>
    </div>
  );
};

export default UploadForm;