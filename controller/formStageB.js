const FormStageB = require("../models/stageB.model");
const FormStageA = require("../models/stageA.model");
const Media = require("../models/Media");
const { uploadToCloudinary } = require("../config/cloudinary");
const db = require("../config/mysql2");

class FormStageBController {
  static async create(req, res) {
    let conn;
    let transaction;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      // const { formStageAId } = req.params;
      // console.log(formStageAId)
      const { body, user } = req;
      console.log(req.files);
      const formStageAId = req.body.formStageAId;
      console.log(formStageAId);
      console.log(body);
      // console.log(data);
      const userId = user.id;

      // Verify that Stage A exists
      const stageA = await FormStageA.findByProjectId(formStageAId);
      if (!stageA) {
        return res.status(404).json({
          success: false,
          message: "Stage A form not found",
        });
      }

      const result = await FormStageB.create(body, formStageAId, userId);
      const changeStatus = [];
      if (req.body.isSuccessful === "true" || req.body.isSuccessful === true) {
        changeStatus = await FormStageA.updateStatus(formStageAId, {
          status: "completed",
        });
      } else {
        changeStatus = await FormStageA.updateStatus(formStageAId, {
          status: "Unsuccessful",
        });
      }

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
            console.warn("Invalid file structure:", file);
            continue;
          }

          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(file, {
            folder: `user_${userId}/project_documents`,
            resource_type: "auto",
          });

          if (!uploadResult?.secure_url) continue;

          const [media] = await conn.execute(
            `INSERT INTO media (formStageAId, fileUrl, fileType, userId, originalname) VALUES (?, ?, ?, ?, ?)`,
            [
              result.projectId,
              uploadResult.secure_url,
              file.mimetype || "application/octet-stream",
              userId,
              file.originalname,
            ]
          );
          mediaRecords.push(media);
        } catch (fileError) {
          console.error("File processing error:", fileError);
          // Continue with other files
        }
      }
      // Validate if any files were successfully processed (when files were provided)
      // if (files.length > 0 || mediaRecords.length === 0) {
      //   throw new Error("All file uploads failed");
      // }

      // Commit transaction if everything succeeded
      await conn.commit();

      res.status(201).json({
        success: true,
        data: {
          form: result,
          media: mediaRecords,
          updateFormA: changeStatus,
          message:
            mediaRecords.length === files.length
              ? "Form and all files processed successfully"
              : `Form created with ${mediaRecords.length} of ${files.length} files`,
        },
      });
    } catch (error) {
      // Rollback transaction if any error occurred
      if (conn) await conn.rollback(transaction);

      console.error("Controller error:", error);
      const statusCode = error.message.includes("required") ? 400 : 500;

      res.status(statusCode).json({
        success: false,
        message: error.message || "Form creation failed",
        suggestion:
          statusCode === 401
            ? "Please log in and try again"
            : "Check your input and try again",
      });
    }
  }

  static async getByStageAId(req, res) {
    try {
      const { formStageAId } = req.body.formStageAId;
      const form = await FormStageB.findByFormStageAId(formStageAId);

      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async findProject(req, res) {
    try {
      const { projectId } = req.params;
      const form = await FormStageB.findById(projectId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "No Stage B form found with this project ID",
        });
      }
      res.status(200).json({
        success: true,
        data: form,
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
      const { id } = req.body.idProject;
      const { body } = req;

      const form = await FormStageB.findById(id);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const updatedForm = await FormStageB.update(id, body);

      res.status(200).json({
        success: true,
        data: updatedForm,
        message: "Stage B form updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = FormStageBController;
