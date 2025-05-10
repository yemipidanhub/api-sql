const FormStageA = require('../models/StageA.model');
const Media = require('../models/Media');
const { uploadToCloudinary } = require('../config/cloudinary');

class FormStageAController {
  static async create(req, res) {
    console.log('Received body:', req.body);
    // console.log('Received files:', req.files);
    try {
      const { body, userId } = req;
      const result = await FormStageA.create(body, userId);
      
      // Handle file uploads if any
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => 
          uploadToCloudinary(file).then(url => 
            Media.create(result.id, url, file.mimetype, userId)
          )
        );
        await Promise.all(uploadPromises);
      }
      
      res.status(201).json({ 
        success: true, 
        data: result,
        message: 'Stage A form created successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async getByProjectId(req, res) {
    try {
      const { projectId } = req.params;
      const form = await FormStageA.findByProjectId(projectId);
      
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      const media = await Media.findByFormStageAId(form.id);
      
      res.status(200).json({ 
        success: true, 
        data: { ...form, media } 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { body, userId } = req;
      
      const form = await FormStageA.findById(id);
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      const updatedForm = await FormStageA.update(id, body);
      
      // Handle new file uploads
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => 
          uploadToCloudinary(file).then(url => 
            Media.create(id, url, file.mimetype, userId)
          )
        );
        await Promise.all(uploadPromises);
      }
      
      res.status(200).json({ 
        success: true, 
        data: updatedForm,
        message: 'Stage A form updated successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = FormStageAController;