const FormStageA = require("../models/StageA.model");
const Media = require("../models/Media");
const { uploadToCloudinary } = require("../config/cloudinary");
const { log } = require("winston");

class FormStageAController {
  static async create(req, res) {

    // Validate authentication first
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userId = req.user.id;
    console.log('Processing request for user:', userId);
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);

    let transaction;
    try {
      // Start database transaction for atomic operations
      transaction = await db.beginTransaction();

      // 1. Create the form record with transaction
      const formResult = await FormStageA.create(req.body, transaction);

      // 2. Process files if they exist
      const files = req.files 
        ? Array.isArray(req.files) 
          ? req.files 
          : [req.files]
        : [];

      const mediaRecords = [];
      
      for (const file of files) {
        try {
          // Validate file structure
          if (!file?.buffer && !file?.path) {
            console.warn('Invalid file structure:', file);
            continue;
          }

          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(
            {
              buffer: file.buffer,
              originalname: file.originalname,
              mimetype: file.mimetype
            },
            {
              folder: `user_${userId}/project_documents`,
              resource_type: 'auto'
            }
          );

          if (!uploadResult?.secure_url) {
            throw new Error('Cloudinary upload failed');
          }

          // Create media record with transaction
          const media = await Media.create(
            formResult.id,
            uploadResult.secure_url,
            file.mimetype || 'application/octet-stream',
            userId,
            transaction
          );
          mediaRecords.push(media);
        } catch (fileError) {
          console.error('File processing error:', fileError);
          // Continue with other files
        }
      }

      // Validate if any files were successfully processed (when files were provided)
      if (files.length > 0 && mediaRecords.length === 0) {
        throw new Error('All file uploads failed');
      }

      // Commit transaction if everything succeeded
      await db.commitTransaction(transaction);

      res.status(201).json({
        success: true,
        data: {
          form: formResult,
          media: mediaRecords,
          message: mediaRecords.length === files.length 
            ? 'Form and all files processed successfully'
            : `Form created with ${mediaRecords.length} of ${files.length} files`
        }
      });

    } catch (error) {
      // Rollback transaction if any error occurred
      if (transaction) await db.rollbackTransaction(transaction);
      
      console.error('Controller error:', error);
      const statusCode = error.message.includes('required') ? 400 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Form creation failed',
        suggestion: statusCode === 401 
          ? 'Please log in and try again'
          : 'Check your input and try again'
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
          message: "Form not found",
        });
      }

      const media = await Media.findByFormStageAId(form.id);

      res.status(200).json({
        success: true,
        data: { ...form, media },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const { body } = req;
      const form = await FormStageA.findById(id);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const updatedForm = await FormStageA.update(id, body);

      // Handle new file uploads
      const files = req.files 
        ? Array.isArray(req.files) 
          ? req.files 
          : [req.files]
        : [];

      const uploadResults = [];
      
      for (const file of files) {
        try {
          const uploadResult = await uploadToCloudinary(file);
          if (uploadResult?.secure_url) {
            await Media.create(id, uploadResult.secure_url, file.mimetype, userId);
            uploadResults.push(uploadResult.secure_url);
          }
        } catch (uploadError) {
          console.error('Failed to upload file:', file?.originalname, uploadError);
        }
      }
      
      res.status(200).json({ 
        success: true, 
        data: {
          ...updatedForm,
          newMedia: uploadResults
        },
        message: 'Stage A form updated successfully' 
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = FormStageAController;
