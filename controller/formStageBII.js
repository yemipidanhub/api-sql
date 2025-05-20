const FormStageBII = require("../models/stageBII.model");
const FormStageB = require("../models/stageB.model");
const Media = require("../models/Media");
const { uploadToCloudinary } = require("../config/cloudinary");
const db = require("../config/mysql2");

class FormStageBIIController {
  static async create(req, res) {
    let conn;
    let transaction;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      const { body, user } = req;
      const { formStageAId } = req.params;
      const userId = user.id;

      //   verify form stage B is there
      const stageB = await FormStageB.findById(formStageAId);
      if (!stageB) {
        return res.status(404).json({
          success: false,
          message: "Stage B form not found",
        });
      }
      const result = await FormStageBII.create(body, formStageAId, userId);

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
              result.formStageAId,
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

      await conn.commit();

      res.status(201).json({
        success: true,
        data: {
          form: result,
          media: mediaRecords,
          message:
            mediaRecords.length === files.length
              ? "Form and all files processed successfully"
              : `Form created with ${mediaRecords.length} of ${files.length} files`,
        },
      });
    } catch (error) {
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
}

module.exports = FormStageBIIController;