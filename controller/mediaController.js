// const fs = require('fs').promises;
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const uploadDir = path.join(__dirname, '../../uploads');

// // Ensure upload directory exists
// async function ensureUploadDir() {
//   try {
//     await fs.mkdir(uploadDir, { recursive: true });
//   } catch (err) {
//     if (err.code !== 'EEXIST') throw err;
//   }
// }

// // Save uploaded file
// exports.saveFile = async (file, subfolder = '') => {
//   await ensureUploadDir();
  
//   const folderPath = path.join(uploadDir, subfolder);
//   await fs.mkdir(folderPath, { recursive: true });
  
//   const fileExt = path.extname(file.originalname);
//   const filename = `${uuidv4()}${fileExt}`;
//   const filepath = path.join(folderPath, filename);
  
//   await fs.rename(file.path, filepath);
  
//   return path.join(subfolder, filename);
// };

// // Delete file
// exports.deleteFile = async (filepath) => {
//   if (!filepath) return;
  
//   const fullPath = path.join(uploadDir, filepath);
//   try {
//     await fs.unlink(fullPath);
//   } catch (err) {
//     if (err.code !== 'ENOENT') throw err;
//   }
// };



const Media = require('../models/Media');
const { deleteFromCloudinary } = require('../config/cloudinary');

class MediaController {
  static async delete(req, res) {
    try {
      const { id } = req.body.idProject;
      const media = await Media.delete(id);
      
      if (!media) {
        return res.status(404).json({ 
          success: false, 
          message: 'Media not found' 
        });
      }
      
      // Delete from Cloudinary
      await deleteFromCloudinary(media.fileUrl);
      
      res.status(200).json({ 
        success: true, 
        message: 'Media deleted successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async getByFormStageAId(req, res) {
    try {
      const { formStageAId } = req.body.formStageAId;
      const media = await Media.findByFormStageAId(formStageAId);
      
      res.status(200).json({ 
        success: true, 
        data: media 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = MediaController;