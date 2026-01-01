const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer"); // to handle image upload
require("dotenv").config();

const Issue = require("./models/Issue");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images statically
app.use("/uploads", express.static("uploads"));

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Simple route to check server
app.get("/", (req, res) => {
  res.send("Trashclick backend running!");
});

// POST route to save issue
app.post("/api/issues", upload.single("image"), async (req, res) => {
  try {
    const { category, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newIssue = new Issue({ category, description, image });
    await newIssue.save();

    res.status(201).json({ message: "Issue raised successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
