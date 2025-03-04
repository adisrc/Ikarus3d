const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: "ikarus-34sd.firebasestorage.app",
});
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "ikarus-34sd.firebasestorage.app",
 
// });

const db = admin.firestore();
const bucket = admin.storage().bucket();
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  app.use(bodyParser.json());


app.get("/test-firebase", async (req, res) => {
    try {
      await db.collection("test").add({
        message: "Firebase API test successful!",
        timestamp: new Date().toISOString(),
      });
  
      res.status(200).json({ success: true, message: "Firebase is connected!" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

// get3dmodels
app.get("/models", async (req, res) => {
  try {
    const modelsRef = db.collection("models");
    const snapshot = await modelsRef.get();
    const models = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});
//upload 3d models from this route
app.post("/upload", upload.single("modelFile"), async (req, res) => {
  try {
    if (!req.file || !req.body.name) {
      return res.status(400).json({ error: "Model file and name are required" });
    } 
    const file = req.file;
    const fileName = `models/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.end(file.buffer);

    stream.on("finish", async () => {
      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-09-2030",
      });

      const newModel = {
        name: req.body.name,
        description: req.body.description || "",
        url,
        uploadDate: new Date().toISOString(),
      };

      const docRef = await db.collection("models").add(newModel);

      res.status(201).json({ id: docRef.id, ...newModel });
    });

    stream.on("error", (error) => {
      res.status(500).json({ error: "File upload failed", details: error });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload model", details: error });
  }
});  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});