const db = require("../config/mysql2");

class FormStageBII {
  static async create(data, formStageAId, userId) {
    const {waterCut} = data;
    let parsedWaterCut;
    if(waterCut === "true"){
      parsedWaterCut = true
    }
    const [result] = await db.execute(
      `INSERT INTO form_stage_b_II (
            formStageAId, depthInstalled, dischargingRate, waterCut, waterCutDate, waterCutTime, staticWaterLevel, userId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formStageAId,
        data.depthInstalled,
        data.dischargingRate,
        parsedWaterCut,
        // data.waterCut,
        data.waterCutDate,
        data.waterCutTime,
        data.staticWaterLevel,
        userId,
      ]
    );
    return { ...data, id: result.insertId, formStageAId };
  }

  static async findByProjectId(projectId) {
    const [rows] = await db.execute(
      "SELECT * FROM form_stage_b_ii WHERE formStageAId = ?",
      [projectId]
    );
    return rows[0];
  }
}

module.exports = FormStageBII;
