const generateID = require("../utils/generateProjectID");
const db = require("../config/mysql2");

class FormStageA {
  static async create(data, userId) {
    // Validate required parameters
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data provided");
    }

    // Generate project ID (moved before destructuring)
    const projectId = generateID();
    console.log("user id", userId);

    // Set default userId if not provided (but better to enforce authentication)
    userId = userId || "unknown"; // Consider throwing error instead for production

    // Destructure with default values to prevent undefined errors
    const {
      projectType = "",
      agencyName = "",
      clientName = "",
      clientPhone = "",
      clientEmail = "",
      state = "",
      lga = "",
      town = "",
      streetAddress = "",
      latitude = "",
      longitude = "",
      consultantName = "",
      consultantPhone = "",
      consultantEmail = "",
      consultantLicenseNumber = "",
      consultantAddress = "",
      estimatedOverburden = "",
      estimatedDepth = "",
      estimatedFractureDepth = "",
      estimatedWeatheredZone = "",
      curveType = "",
      accessibility = "",
    } = data;

    try {
      const [result] = await db.execute(
        `INSERT INTO form_stage_a (
                projectId, projectType, agencyName, clientName, clientPhone, clientEmail,
                state, lga, town, streetAddress, latitude, longitude, consultantName,
                consultantPhone, consultantEmail, consultantLicense, consultantAddress,
                estimatedOverburden, estimatedDepth, estimatedFractureDepth,
                estimatedWeatheredZone, curveType, accessibility, userId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectId,
          projectType,
          agencyName,
          clientName,
          clientPhone,
          clientEmail,
          state,
          lga,
          town,
          streetAddress,
          latitude,
          longitude,
          consultantName,
          consultantPhone,
          consultantEmail,
          consultantLicenseNumber,
          consultantAddress,
          estimatedOverburden,
          estimatedDepth,
          estimatedFractureDepth,
          estimatedWeatheredZone,
          curveType,
          accessibility,
          userId,
        ]
      );

      // Return only necessary fields (don't spread entire data object)
      return {
        id: result.insertId,
        projectId,
        userId,
        status: "created",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Database insertion failed:", error);
      throw new Error("Failed to create project record");
    }
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM form_stage_a WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async findByProjectId(projectId) {
    const [rows] = await db.execute(
      "SELECT * FROM form_stage_a WHERE projectId = ?",
      [projectId]
    );
    return rows[0];
  }

static async updateStatus(projectId, data) {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), projectId];
  const query = `UPDATE form_stage_a SET ${fields} WHERE projectId = ?`;

  await db.execute(query, values);

  return {
    projectId: projectId,
    status: "completed",
  }
}


  static async update(id, data) {
    await db.execute(
      `UPDATE form_stage_a SET 
        projectType = ?, agencyName = ?, clientName = ?, clientPhone = ?, clientEmail = ?,
        state = ?, lga = ?, town = ?, streetAddress = ?, latitude = ?, longitude = ?,
        consultantName = ?, consultantPhone = ?, consultantEmail = ?, consultantLicense = ?,
        consultantAddress = ?, estimatedOverburden = ?, estimatedDepth = ?,
        estimatedFractureDepth = ?, estimatedWeatheredZone = ?, curveType = ?,
        accessibility = ?, status = ?
      WHERE id = ?`,
      [
        data.projectType,
        data.agencyName,
        data.clientName,
        data.clientPhone,
        data.clientEmail,
        data.state,
        data.lga,
        data.town,
        data.streetAddress,
        data.latitude,
        data.longitude,
        data.consultantName,
        data.consultantPhone,
        data.consultantEmail,
        data.consultantLicense,
        data.consultantAddress,
        data.estimatedOverburden,
        data.estimatedDepth,
        data.estimatedFractureDepth,
        data.estimatedWeatheredZone,
        data.curveType,
        data.accessibility,
        data.status,
        id,
      ]
    );
    return this.findById(id);
  }
}

module.exports = FormStageA;
