const FormStageC = require('../models/stageC.model');
const FormStageB = require('../models/stageB.model');
const { uploadToCloudinary } = require('../config/cloudinary');

class FormStageCController {
  static async create(req, res) {
    try {
      const { formStageBId } = req.body.formStageBId;
      const { body, userId } = req;
      
      // Verify that Stage B exists
      const stageB = await FormStageB.findById(formStageBId);
      if (!stageB) {
        return res.status(404).json({ 
          success: false, 
          message: 'Stage B form not found' 
        });
      }
      
      // Handle file uploads
      let labTestCertificatePath = null;
      let rawLabSheetPath = null;
      let samplingPointPhotosPaths = [];
      
      if (req.files) {
        const files = req.files;
        
        // Handle lab test certificate
        if (files.labTestCertificate) {
          labTestCertificatePath = await uploadToCloudinary(files.labTestCertificate[0]);
        }
        
        // Handle raw lab sheet
        if (files.rawLabSheet) {
          rawLabSheetPath = await uploadToCloudinary(files.rawLabSheet[0]);
        }
        
        // Handle sampling point photos
        if (files.samplingPointPhotos) {
          const uploadPromises = files.samplingPointPhotos.map(file => 
            uploadToCloudinary(file)
          );
          samplingPointPhotosPaths = await Promise.all(uploadPromises);
        }
      }
      
      const formData = {
        ...body,
        labTestCertificatePath,
        rawLabSheetPath,
        samplingPointPhotosPaths
      };
      
      const result = await FormStageC.create(formData, formStageBId, userId);
      
      res.status(201).json({ 
        success: true, 
        data: result,
        message: 'Stage C form created successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async getByStageBId(req, res) {
    try {
      const { formStageBId } = req.body.formStageBId;
      const form = await FormStageC.findByFormStageBId(formStageBId);
      
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: form 
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
      const { id } = req.body.idProject;
      const { body } = req;
      
      const form = await FormStageC.findById(id);
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      // Handle file uploads for updates
      let labTestCertificatePath = form.labTestCertificatePath;
      let rawLabSheetPath = form.rawLabSheetPath;
      let samplingPointPhotosPaths = form.samplingPointPhotosPaths;
      
      if (req.files) {
        const files = req.files;
        
        if (files.labTestCertificate) {
          labTestCertificatePath = await uploadToCloudinary(files.labTestCertificate[0]);
        }
        
        if (files.rawLabSheet) {
          rawLabSheetPath = await uploadToCloudinary(files.rawLabSheet[0]);
        }
        
        if (files.samplingPointPhotos) {
          const uploadPromises = files.samplingPointPhotos.map(file => 
            uploadToCloudinary(file)
          );
          const newPhotos = await Promise.all(uploadPromises);
          samplingPointPhotosPaths = [...samplingPointPhotosPaths, ...newPhotos];
        }
      }
      
      const formData = {
        ...body,
        labTestCertificatePath,
        rawLabSheetPath,
        samplingPointPhotosPaths
      };
      
      const updatedForm = await FormStageC.update(id, formData);
      
      res.status(200).json({ 
        success: true, 
        data: updatedForm,
        message: 'Stage C form updated successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = FormStageCController;