const express = require("express");
const router = express.Router();
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

// ✅ Correct model import (assuming Upload is not in Project.js)
const Upload = require("../models/Upload.model")(sequelize, DataTypes); // adjust path if needed

router.post("/", upload.array("media", 10), async function (req, res) {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const { stage, fileType, projectId} = req.body;
  // const uploadedBy = req.user?.id; // assumes auth middleware sets req.user
  const uploadedBy = req.cookies.userId; // ✅ Correct place to use it

  if (!uploadedBy) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    // Validate files
    for (const file of files) {
      if (
        !["image/jpeg", "image/png", "application/pdf"].includes(file.mimetype)
      ) {
        throw new Error(`Invalid file type: ${file.originalname}`);
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`File too large: ${file.originalname}`);
      }
    }

    // Upload files to Cloudinary
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        try {
          return await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
          });
        } catch (err) {
          console.error(`Failed to upload ${file.originalname}:`, err);
          return {
            error: true,
            name: file.originalname,
            message: err.message,
          };
        }
      })
    );

    // Filter successful uploads
    const successfulUploads = uploadResults.filter((result) => !result.error);

    // ✅ Store successful uploads in DB
    const dbEntries = await Upload.bulkCreate(
      successfulUploads.map((result) => ({
        stage,
        fileType,
        url: result.secure_url,
        name: result.public_id, // or original_filename if preferred
        size: result.bytes,
        uploadedBy,
        projectId,
      }))
    );

    // Send response
    res.status(200).json({
      success: true,
      message: `${successfulUploads.length} of ${files.length} files uploaded`,
      data: dbEntries,
      failed: files.length - successfulUploads.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Upload failed",
    });
  } finally {
    // Clean up temp files
    files.forEach((file) => {
      try {
        fs.unlinkSync(file.path);
      } catch (cleanupErr) {
        console.error("Failed to cleanup temp file:", file.path, cleanupErr);
      }
    });
  }
});

module.exports = router;
