const db = require("../config/mysql2");

class FormStageB {
  static async create(data, formStageAId, userId) {
    // console.log(data);
    console.log(formStageAId);
    console.log(userId);

    console.log({
      formStageAId,
      drillingCompany: data.drillingCompany,
      drillingLicense: data.drillingLicense,
      permitNo: data.permitNo,
      permitIssueDate: data.permitIssueDate,
      actualOverburden: data.actualOverburden,
      fracturedZone: data.fracturedZone,
      weatheredZone: data.weatheredZone,
      depthDrilled: data.depthDrilled,
      drilledDiameter: data.drilledDiameter,
      drillingMethod: data.drillingMethod,
      rods: data.rods,
      casingDiameter: data.casingDiameter,
      casingType: data.casingType,
      casingLength: data.casingLength,
      casingCount: data.casingCount,
      gravelPackingSize: data.gravelPackingSize,
      isSuccessful: data.isSuccessful,
      reasonUnsuccessful: data.reasonUnsuccessful,
      userId,
    });

    const [result] = await db.execute(
      `INSERT INTO form_stage_b (
        formStageAId, drillingCompany, drillingLicense, permitNo, permitIssueDate,
        actualOverburden, fracturedZone, weatheredZone, depthDrilled, drilledDiameter,
        drillingMethod, rods, casingDiameter, casingType, casingLength, casingCount,
        gravelPackingSize, isSuccessful, reasonUnsuccessful, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formStageAId,
        data.drillingCompany,
        data.drillingLicense,
        data.permitNo,
        data.permitIssueDate,
        data.actualOverburden,
        data.fracturedZone,
        data.weatheredZone,
        data.depthDrilled,
        data.drilledDiameter,
        data.drillingMethod,
        JSON.stringify(data.rods || []),
        data.casingDiameter,
        data.casingType,
        data.casingLength,
        data.casingCount,
        data.gravelPackingSize,
        data.isSuccessful,
        data.reasonUnsuccessful,
        userId,
      ]
    );
    return { ...data, id: result.insertId, formStageAId };
  }

  static async findById(projectId) {
    const [rows] = await db.execute(
      "SELECT * FROM form_stage_b WHERE formStageAId = ?",
      [projectId]
    );
    return rows[0];
  }

  static async update(id, data) {
    await db.execute(
      `UPDATE form_stage_b SET 
        drillingCompany = ?, drillingLicense = ?, permitNo = ?, permitIssueDate = ?,
        actualOverburden = ?, fracturedZone = ?, weatheredZone = ?, depthDrilled = ?,
        drilledDiameter = ?, drillingMethod = ?, rods = ?, casingDiameter = ?,
        casingType = ?, casingLength = ?, casingCount = ?, gravelPackingSize = ?,
        isSuccessful = ?, depthInstalled = ?, dischargingRate = ?, waterCut = ?,
        waterCutDate = ?, waterCutTime = ?, staticWaterLevel = ?, status = ?
      WHERE id = ?`,
      [
        data.drillingCompany,
        data.drillingLicense,
        data.permitNo,
        data.permitIssueDate,
        data.actualOverburden,
        data.fracturedZone,
        data.weatheredZone,
        data.depthDrilled,
        data.drilledDiameter,
        data.drillingMethod,
        JSON.stringify(data.rods || []),
        data.casingDiameter,
        data.casingType,
        data.casingLength,
        data.casingCount,
        data.gravelPackingSize,
        data.isSuccessful,
        data.depthInstalled,
        data.dischargingRate,
        data.waterCut,
        data.waterCutDate,
        data.waterCutTime,
        data.staticWaterLevel,
        data.status,
        id,
      ]
    );
    return this.findById(id);
  }
}

module.exports = FormStageB;
