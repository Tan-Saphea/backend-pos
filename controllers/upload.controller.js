const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, "../upload");

    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const filename = Date.now() + extName;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and GIF are allowed!!"), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadFile = (req, res) => {
  try {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully!",
        filename: req.file.filename,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const removeFile = (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    const imagePath = path.join(__dirname, "../upload", req.body.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);

      return res.status(200).json({
        success: true,
        message: "Image deleted successfully!",
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Image not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while deleting image!",
    });
  }
};

module.exports = {
  uploadFile,
  removeFile,
};
