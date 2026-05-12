const express = require("express");
const router = express.Router();
const { uploadFile, removeFile } = require("../controllers/upload.controller");

router.route("/").post(uploadFile).delete(removeFile);

module.exports = router;
