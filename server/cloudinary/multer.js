const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed."));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

module.exports = upload;
