const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const db = require("../config/db");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/download/:id", authenticate, require("../controllers/MediaController").download);
router.get("/media/project/:projectId", authenticate, require("../controllers/MediaController").getByProjectId);

router.post("/", authenticate, upload.array("media", 10), async (req, res) => {
  const files = req.files;
  const user = req.user; 
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const { stage, projectId } = req.body;

  try {
    // Validate files
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!validTypes.includes(file.mimetype)) {
        throw new Error(`Invalid file type: ${file.originalname}`);
      }
      if (file.size > maxSize) {
        throw new Error(`File too large (max 5MB): ${file.originalname}`);
      }
    }

    // Upload to Cloudinary
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: `projects/${projectId}`,
          });
          return {
            success: true,
            data: {
              ...result,
              originalname: file.originalname,
              mimetype: file.mimetype
            }
          };
        } catch (err) {
          return {
            success: false,
            error: err.message,
            filename: file.originalname
          };
        }
      })
    );

    // Process successful uploads
    const successfulUploads = uploadResults.filter(r => r.success);
    const failedUploads = uploadResults.filter(r => !r.success);

    // Save to database
    const dbEntries = await Promise.all(
      successfulUploads.map(async (upload) => {
        const [result] = await db.execute(
          `INSERT INTO media 
          (formStageAId, projectId, url, name, originalname, type, size, uploadedBy)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            null, // or actual formStageAId if available
            projectId,
            upload.data.secure_url,
            upload.data.public_id,
            upload.data.originalname,
            upload.data.mimetype,
            upload.data.bytes,
            user.id
          ]
        );
        return { id: result.insertId, ...upload.data };
      })
    );

    res.status(200).json({
      success: true,
      message: `Uploaded ${successfulUploads.length} of ${files.length} files`,
      data: dbEntries,
      failed: failedUploads.map(f => ({
        filename: f.filename,
        error: f.error
      }))
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Upload failed",
    });
  } finally {
    // Cleanup temp files
    files.forEach(file => {
      try {
        fs.unlinkSync(file.path);
      } catch (cleanupErr) {
        console.error("Failed to cleanup temp file:", file.path, cleanupErr);
      }
    });
  }
});

module.exports = router;