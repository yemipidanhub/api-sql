// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// module.exports = () => {
// const FormStageB = sequelize.define('FormStageB', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   formStageAId: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   drillingCompany: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   drillingLicense: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   permitNo: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   permitIssueDate: {
//     type: DataTypes.DATEONLY,
//     allowNull: false
//   },
//   actualOverburden: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fracturedZone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   weatheredZone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   depthDrilled: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   drilledDiameter: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   drillingMethod: {
//     type: DataTypes.ENUM('mud-drill', 'dthh', 'both'),
//     allowNull: false
//   },
//   rods: {
//     type: DataTypes.JSON,
//     allowNull: true,
//     defaultValue: []
//   },
//   casingDiameter: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   casingType: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   casingLength: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   casingCount: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   gravelPackingSize: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   isSuccessful: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false
//   },
//   depthInstalled: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   dischargingRate: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   waterCut: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true
//   },
//   waterCutDate: {
//     type: DataTypes.DATEONLY,
//     allowNull: true
//   },
//   waterCutTime: {
//     type: DataTypes.TIME,
//     allowNull: true
//   },
//   staticWaterLevel: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   userId: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('draft', 'completed'),
//     defaultValue: 'draft'
//   }
// }, {
//   timestamps: true,
//   paranoid: true,
//   tableName: 'form_stage_b'
// });

// FormStageB.associate = (models) => {
//   FormStageB.belongsTo(models.Project, { foreignKey: 'projectId' });
// };

// return FormStageB;
// };

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
      depthInstalled: data.depthInstalled,
      dischargingRate: data.dischargingRate,
      waterCut: data.waterCut,
      waterCutDate: data.waterCutDate,
      waterCutTime: data.waterCutTime,
      staticWaterLevel: data.staticWaterLevel,
      reasonUnsuccessful: data.reasonUnsuccessful,
      userId,
    });

    const [result] = await db.execute(
      `INSERT INTO form_stage_b (
        formStageAId, drillingCompany, drillingLicense, permitNo, permitIssueDate,
        actualOverburden, fracturedZone, weatheredZone, depthDrilled, drilledDiameter,
        drillingMethod, rods, casingDiameter, casingType, casingLength, casingCount,
        gravelPackingSize, isSuccessful, depthInstalled, dischargingRate, waterCut,
        waterCutDate, waterCutTime, staticWaterLevel, reasonUnsuccessful, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        data.depthInstalled,
        data.dischargingRate,
        data.waterCut,
        data.waterCutDate,
        data.waterCutTime,
        data.staticWaterLevel,
        data.reasonUnsuccessful,
        userId,
      ]
    );
    return { ...data, id: result.insertId, formStageAId };
  }

  static async findByFormStageAId(formStageAId) {
    const [rows] = await db.execute(
      "SELECT * FROM form_stage_b WHERE formStageAId = ?",
      [formStageAId]
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
