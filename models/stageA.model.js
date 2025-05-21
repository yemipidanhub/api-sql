const generateID = require("../utils/generateProjectID");
const db = require("../config/mysql2");

class FormStageA {
static async create(data, userId) {
  console.log(data);
  
  if (!data.terrainType) {
    throw new Error("Terrain type is required");
  }

  // Add data cleansing
  const cleanData = {
    ...data,
    terrainType: data.terrainType.toLowerCase(),
  };

  // Modify strata processing to prevent SQL injection
  const strataData = [];
  let otherObservations = null; 
  if (cleanData.terrainType === "sedimentary") {
  otherObservations = data.otherObservations?.substring(0, 2000) || null; 
  
  // Add validation
  if (!data.otherObservations) {
    throw new Error("Other observations are required for sedimentary terrain");
  }
}
  if (cleanData.terrainType === "sedimentary") {
    for (let i = 1; i <= 50; i++) {
      const value = cleanData[`strata${i}`];
      if (value && typeof value === "string") {
        strataData.push({
          layer: i,
          description: value.substring(0, 255) // Limit length
        });
      }
    }
  }
    // Validate required parameters
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data provided");
    }

    const projectId = generateID();
    console.log("user id", userId);
    // Prepare basement fields
    const basementFields = {
      estimatedOverburden: cleanData.terrainType === "basement" ? data.estimatedOverburden : null,
      estimatedDepth: cleanData.terrainType === "basement" ? data.estimatedDepth : null,
      estimatedFractureDepth: cleanData.terrainType === "basement" ? data.estimatedFractureDepth : null,
      estimatedWeatheredZone: cleanData.terrainType === "basement" ? data.estimatedWeatheredZone : null,
      curveType: cleanData.terrainType === "basement" ? data.curveType : null
    };

    try {
      const [result] = await db.execute(
        `INSERT INTO form_stage_a (
          projectId, projectType, agencyName, clientName, clientPhone, clientEmail,
          state, lga, town, streetAddress, latitude, longitude, consultantName,
          consultantPhone, consultantEmail, consultantLicense, consultantAddress,  
          terrainType, strataData, otherObservations,
          estimatedOverburden, estimatedDepth, estimatedFractureDepth,
          estimatedWeatheredZone, curveType, accessibility, userId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectId,
          data.projectType || "",
          data.agencyName || "Not Agency",
          data.clientName || "",
          data.clientPhone || "",
          data.clientEmail || "",
          data.state || "",
          data.lga || "",
          data.town || "",
          data.streetAddress || "",
          data.latitude || "",
          data.longitude || "",
          data.consultantName || "",
          data.consultantPhone || "",
          data.consultantEmail || "",
          data.consultantLicenseNumber || "",
          data.consultantAddress || "",
          cleanData.terrainType || "",
          strataData ? JSON.stringify(strataData) : null,
          otherObservations,
          basementFields.estimatedOverburden,
          basementFields.estimatedDepth,
          basementFields.estimatedFractureDepth,
          basementFields.estimatedWeatheredZone,
          basementFields.curveType,
          data.accessibility || "",
          userId
        ]
      );

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
  // Process strata data if terrain is sedimentary
  let strataData = null;
  if (data.terrainType === "sedimentary") {
    strataData = [];
    // Collect strata fields from 1 to 50
    for (let i = 1; i <= 50; i++) {
      const strataValue = data[`strata${i}`];
      if (strataValue) {
        strataData.push({
          layer: i,
          description: strataValue
        });
      }
      // Remove individual strata fields from data
      delete data[`strata${i}`];
    }
    otherObservations = data.otherObservations?.substring(0, 2000) || null;
    // Add processed strata data to update
    data.strata_data = strataData.length > 0 ? JSON.stringify(strataData) : null;
  }

  // Clean up fields based on terrain type
  if (data.terrainType === "basement") {
    delete data.strata_data;
    delete data.other_observations;
  } else if (data.terrainType === "sedimentary") {
    delete data.estimatedOverburden;
    delete data.estimatedDepth;
    delete data.estimatedFractureDepth;
    delete data.estimatedWeatheredZone;
    delete data.curveType;
  }

  // Build dynamic update query
  const fields = Object.keys(data)
    .filter(key => key !== 'id') // Exclude ID from update fields
    .map(key => `${key} = ?`)
    .join(', ');

  const values = [
    ...Object.values(data),
    id
  ];

  try {
    await db.execute(
      `UPDATE form_stage_a SET
        ${fields}
      WHERE id = ?`,
      values
    );

    return this.findById(id);
  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update project record");
  }
}

  // find all projects for a specific user
  static async findAll(userId) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM form_stage_a WHERE userId = ? ORDER BY createdAt DESC",
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Error fetching forms for user:", error);
      throw new Error("Failed to fetch user's projects");
    }
  }
}

module.exports = FormStageA;
