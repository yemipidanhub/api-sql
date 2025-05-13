const FormStageA = require("../models/stageA.model");
const Media = require("../models/Media");
const { uploadToCloudinary } = require("../config/cloudinary");
const db = require("../config/mysql2");

class FormStageAController {
  static async create(req, res) {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userId = req.user.id;
    console.log("Processing request for user:", userId);
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    let conn;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      const formResult = await FormStageA.create(req.body, userId);

      const files = req.files
        ? Array.isArray(req.files)
          ? req.files
          : [req.files]
        : [];

      const mediaRecords = [];

      for (const file of files) {
        try {
          if (!file?.buffer && !file?.path) {
            console.warn("Invalid file structure:", file);
            continue;
          }

          const uploadResult = await uploadToCloudinary(
            {
              buffer: file.buffer,
              originalname: file.originalname,
              mimetype: file.mimetype,
            },
            {
              folder: `user_${userId}/project_documents`,
              resource_type: "auto",
            }
          );

          if (!uploadResult?.secure_url) {
            throw new Error("Cloudinary upload failed");
          }

          const media = await Media.create({
            formStageAId: formResult.projectId,
            fileUrl: uploadResult.secure_url,
            fileType: file.mimetype || "application/octet-stream",
            userId,
          });

          mediaRecords.push(media);
        } catch (fileError) {
          console.error("File processing error:", fileError);
        }
      }

      if (files.length > 0 && mediaRecords.length === 0) {
        throw new Error("All file uploads failed");
      }

      await conn.commit();

      res.status(201).json({
        success: true,
        data: {
          form: formResult,
          media: mediaRecords,
          message:
            mediaRecords.length === files.length
              ? "Form and all files processed successfully"
              : `Form created with ${mediaRecords.length} of ${files.length} files`,
        },
      });
    } catch (error) {
      if (conn) await conn.rollback();
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
    } finally {
      if (conn) conn.release();
    }
  }

  static async getByProjectId(req, res) {
    try {
      const { projectId } = req.body;

      const form = await FormStageA.findByProjectId(projectId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const media = await Media.findByFormStageAId(form.projectId);

      res.status(200).json({
        success: true,
        data: {
          ...form,
          media: media || [],
        },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body.idProject;
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

      const files = req.files
        ? Array.isArray(req.files)
          ? req.files
          : [req.files]
        : [];

      const uploadResults = [];

      for (const file of files) {
        try {
          const uploadResult = await uploadToCloudinary(
            {
              buffer: file.buffer,
              originalname: file.originalname,
              mimetype: file.mimetype,
            },
            {
              folder: `user_${userId}/project_documents`,
              resource_type: "auto",
            }
          );

          if (uploadResult?.secure_url) {
            await Media.create({
              formStageAId: id,
              fileUrl: uploadResult.secure_url,
              fileType: file.mimetype,
              userId,
            });
            uploadResults.push(uploadResult.secure_url);
          }
        } catch (uploadError) {
          console.error(
            "Failed to upload file:",
            file?.originalname,
            uploadError
          );
        }
      }

      res.status(200).json({
        success: true,
        data: {
          ...updatedForm,
          newMedia: uploadResults,
        },
        message: "Stage A form updated successfully",
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async fetchUserProjects(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
      const projects = await FormStageA.findAll(userId);
    } catch (error) {
      console.log("error");
    }
  }
}

module.exports = FormStageAController;
