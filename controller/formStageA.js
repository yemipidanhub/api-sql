const FormStageA = require("../models/stageA.model");
const Media = require("../models/Media");
const db = require("../config/mysql2");
const { uploadToCloudinary } = require("../config/cloudinary");

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
    console.log("Received body:", req.body.formData);
    console.log("Received files:", req.files);
    console.log("checking", req.body);

    let formData;
    try {
      formData = JSON.parse(req.body.formData); // ✅ Parse string into object
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid formData format",
      });
    }

    let conn;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      // Clean the input data
      const cleanData = {
        ...formData,
        terrainType: formData.terrainType?.toLowerCase() || null,
        otherObservations:
          formData.terrainType?.toLowerCase() === "sedimentary"
            ? formData.otherObservations?.substring(0, 2000)
            : null,
        userId,
      };

      // console.log("Clean Data:", cleanData);

      const formResult = await FormStageA.create(cleanData, userId);

      // 2. Process files
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

          // if (!file?.buffer && !file?.path) continue;

          const uploadResult = await uploadToCloudinary(file, {
            folder: `user_${userId}/project_documents`,
            resource_type: "auto",
          });

          if (!uploadResult?.secure_url) continue;

          const [media] = await conn.execute(
            `INSERT INTO media (formStageAId, fileUrl, fileType, userId, originalname) VALUES (?, ?, ?, ?, ?)`,
            [
              formResult.projectId,
              uploadResult.secure_url,
              file.mimetype || "application/octet-stream",
              userId,
              file.originalname,
            ]
          );
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
          form: {
            projectId: formResult.projectId,
            terrainType: cleanData.terrainType,
          },
          media: mediaRecords.map((m) => ({
            id: m.insertId,
            url: m.fileUrl,
          })),
        },
      });
    } catch (error) {
      if (conn) await conn.rollback();
      // if (conn) await conn.rollback();
      console.error("Controller error:", error);

      const statusCode = error.message.includes("required") ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || "Form creation failed",
      });
    } finally {
      if (conn) conn.release();
    }
  }

  static async getByProjectId(req, res) {
    try {
      const { projectId } = req.params;
      console.log(projectId);

      // 1. Get the form
      const [formRows] = await db.execute(
        "SELECT * FROM form_stage_a WHERE projectId = ? LIMIT 1",
        [projectId]
      );

      if (formRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Stage A form found with this project ID",
        });
      }

      const form = formRows[0];

      // 2. Get media with fallback for missing columns
      let media = [];
      try {
        // First try with originalname column
        try {
          const [mediaRows] = await db.execute(
            "SELECT id, fileUrl as url, originalname, fileType as type FROM media WHERE formStageAId = ?",
            [form.id]
          );
          media = mediaRows;
        } catch (e) {
          // Fallback if originalname column doesn't exist
          if (e.code === "ER_BAD_FIELD_ERROR") {
            const [mediaRows] = await db.execute(
              "SELECT id, fileUrl as url, fileType as type FROM media WHERE formStageAId = ?",
              [form.id]
            );
            media = mediaRows.map((m) => ({
              ...m,
              originalname: m.url.split("/").pop() || "file", // Simple fallback
            }));
          } else {
            throw e;
          }
        }
      } catch (mediaError) {
        console.error("Error fetching media:", mediaError);
      }

      res.status(200).json({
        success: true,
        data: {
          ...form,
          media,
          projectId: form.projectId,
        },
      });
    } catch (error) {
      console.error("Error fetching Stage A form:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching form",
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body.idProject;
      const userId = req.user?.id;

      // Check if form exists
      const [formRows] = await db.execute(
        "SELECT * FROM form_stage_a WHERE id = ? LIMIT 1",
        [id]
      );

      if (formRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      // Update form
      await db.execute("UPDATE form_stage_a SET ? WHERE id = ?", [
        req.body,
        id,
      ]);

      // Handle file uploads
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
            await db.execute("INSERT INTO media SET ?", [
              {
                formStageAId: id,
                fileUrl: uploadResult.secure_url,
                fileType: file.mimetype,
                userId: userId,
                originalname: file.originalname,
              },
            ]);
            uploadResults.push(uploadResult.secure_url);
          }
        } catch (uploadError) {
          console.error("Failed to upload file:", uploadError);
        }
      }

      res.status(200).json({
        success: true,
        message: "Stage A form updated successfully",
        newMedia: uploadResults,
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
      console.log(projects);
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      console.log("error");
    }
  }

  static async findProject(req, res) {
    try {
      const { projectId } = req.params;
      const form = await FormStageA.findByProjectId(projectId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "No Stage A form found with this project ID",
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
}

module.exports = FormStageAController;
