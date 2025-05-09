// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/db");

// module.exports = () => {
//   const FormStageC = sequelize.define(
//     "FormStageC",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       formStageBId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//       projectID: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       projectName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       waterType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       state: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lga: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       community: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       gpsCoordinates: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       testerFullName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       testerRole: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       testerLicenseNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       testerPhoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       testerEmailAddress: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       dateOfSampleCollection: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       timeOfCollection: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       collectedBy: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       weatherConditions: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       sampleContainerType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       observations: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       parameters: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         defaultValue: [],
//       },
//       labTestCertificatePath: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       rawLabSheetPath: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       samplingPointPhotosPaths: {
//         type: DataTypes.JSON,
//         allowNull: true,
//         defaultValue: [],
//       },
//       isSafe: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       nextStep: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       comments: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       signatureData: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       submissionDate: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.ENUM("draft", "submitted", "approved", "rejected"),
//         defaultValue: "draft",
//       },
//     },
//     {
//       timestamps: true,
//       paranoid: true,
//       tableName: "form_stage_c",
//     }
//   );
//   return FormStageC;
// };


const db = require('../config/db');

class FormStageC {
  static async create(data, formStageBId, userId) {
    const [result] = await db.execute(
      `INSERT INTO form_stage_c (
        formStageBId, projectID, projectName, waterType, state, lga, community,
        gpsCoordinates, testerFullName, testerRole, testerLicenseNumber,
        testerPhoneNumber, testerEmailAddress, dateOfSampleCollection,
        timeOfCollection, collectedBy, weatherConditions, sampleContainerType,
        observations, parameters, labTestCertificatePath, rawLabSheetPath,
        samplingPointPhotosPaths, isSafe, nextStep, comments, signatureData,
        submissionDate, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formStageBId, data.projectID, data.projectName, data.waterType, data.state, data.lga, data.community,
        data.gpsCoordinates, data.testerFullName, data.testerRole, data.testerLicenseNumber,
        data.testerPhoneNumber, data.testerEmailAddress, data.dateOfSampleCollection,
        data.timeOfCollection, data.collectedBy, data.weatherConditions, data.sampleContainerType,
        data.observations, JSON.stringify(data.parameters || []), data.labTestCertificatePath,
        data.rawLabSheetPath, JSON.stringify(data.samplingPointPhotosPaths || []), data.isSafe,
        data.nextStep, data.comments, data.signatureData, data.submissionDate, userId
      ]
    );
    return { ...data, id: result.insertId, formStageBId };
  }

  static async findByFormStageBId(formStageBId) {
    const [rows] = await db.execute('SELECT * FROM form_stage_c WHERE formStageBId = ?', [formStageBId]);
    return rows[0];
  }

  static async update(id, data) {
    await db.execute(
      `UPDATE form_stage_c SET 
        projectID = ?, projectName = ?, waterType = ?, state = ?, lga = ?, community = ?,
        gpsCoordinates = ?, testerFullName = ?, testerRole = ?, testerLicenseNumber = ?,
        testerPhoneNumber = ?, testerEmailAddress = ?, dateOfSampleCollection = ?,
        timeOfCollection = ?, collectedBy = ?, weatherConditions = ?, sampleContainerType = ?,
        observations = ?, parameters = ?, labTestCertificatePath = ?, rawLabSheetPath = ?,
        samplingPointPhotosPaths = ?, isSafe = ?, nextStep = ?, comments = ?, signatureData = ?,
        submissionDate = ?, status = ?
      WHERE id = ?`,
      [
        data.projectID, data.projectName, data.waterType, data.state, data.lga, data.community,
        data.gpsCoordinates, data.testerFullName, data.testerRole, data.testerLicenseNumber,
        data.testerPhoneNumber, data.testerEmailAddress, data.dateOfSampleCollection,
        data.timeOfCollection, data.collectedBy, data.weatherConditions, data.sampleContainerType,
        data.observations, JSON.stringify(data.parameters || []), data.labTestCertificatePath,
        data.rawLabSheetPath, JSON.stringify(data.samplingPointPhotosPaths || []), data.isSafe,
        data.nextStep, data.comments, data.signatureData, data.submissionDate, data.status, id
      ]
    );
    return this.findById(id);
  }
}

module.exports = FormStageC;