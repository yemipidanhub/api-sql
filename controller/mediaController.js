const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');

class MediaController {
  static async download(req, res) {
    try {
      const { id } = req.params;
      
      // 1. Get media info from database
      const [mediaRows] = await db.execute(
        "SELECT * FROM media WHERE id = ? LIMIT 1",
        [id]
      );
      
      if (mediaRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "File not found"
        });
      }
      
      const media = mediaRows[0];

      // 2. Handle Cloudinary URLs
      if (media.url.includes('cloudinary')) {
        return res.redirect(media.url);
      }

      // 3. Handle local files
      const filePath = path.join(__dirname, '../uploads', media.filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "File not found on server"
        });
      }

      res.download(filePath, media.originalname || media.filename, (err) => {
        if (err) {
          console.error("Download failed:", err);
          res.status(500).json({
            success: false,
            message: "Failed to download file"
          });
        }
      });
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Download failed"
      });
    }
  }
// }

// module.exports = MediaController;
static async getByFormStageAId(req, res) {
  try {
    const { formStageAId } = req.params;

    const mediaFiles = await Upload.findAll({
      where: { formStageAId }
    });

    if (!mediaFiles.length) {
      return res.status(404).json({
        success: false,
        message: "No media found for this Form Stage A ID"
      });
    }

    return res.status(200).json({
      success: true,
      data: mediaFiles
    });
  } catch (error) {
    console.error("GetByFormStageAId error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
}

static async getByProjectId(req, res) {
  try {
    const { projectId } = req.params;

    const mediaFiles = await Upload.findAll({
      where: { projectId }
    });

    if (!mediaFiles.length) {
      return res.status(404).json({
        success: false,
        message: "No media found for this project ID"
      });
    }

    return res.status(200).json({
      success: true,
      data: mediaFiles
    });
  } catch (error) {
    console.error("getByProjectId error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
}

static async getMedia(req, res) {
  try{
    const {projectId} = req.params;
    const media = await Media.findByFormStageAId(projectId)
    res.status(200).json({
      success: true,
      data: media
    })
  } catch(error) {
    console.log("error:", error)
  }
} 


  static async delete(req, res) {
    try {
      const { id } = req.params;
      const media = await Upload.findByPk(id);

      if (!media) {
        return res.status(404).json({
          success: false,
          message: "Media not found"
        });
      }

      // Delete from Cloudinary if applicable
      if (media.url.includes('cloudinary') && media.publicId) {
        await cloudinary.uploader.destroy(media.publicId);
      } else {
        // Delete local file
        const filePath = path.join(__dirname, '../uploads', media.name);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Delete from database
      await media.destroy();

      return res.status(200).json({
        success: true,
        message: "Media deleted successfully"
      });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete media"
      });
    }
  }
}

module.exports = MediaController;
