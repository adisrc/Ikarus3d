import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name) {
      setMessage("Model file and name are required!");
      return;
    }

    const formData = new FormData();
    formData.append("modelFile", file);
    formData.append("name", name);
    formData.append("description", description);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Upload successful! Model ID: ${data.id}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to upload model.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-black text-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Upload 3D Model</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".glb"
          onChange={handleFileChange}
          className="block w-full border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full border p-2 rounded-lg"
        />
        <textarea
          placeholder="Model Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full border p-2 rounded-lg"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadForm;