

const db = require('../config/db');

class FormStageC {
  static async create(data, projectId, userId) {
    const [result] = await db.execute(
      `INSERT INTO form_stage_c (
        formStageBId, projectID, waterType, state, lga, community,
        gpsCoordinates, testerFullName, testerRole, testerLicenseNumber,
        testerPhoneNumber, testerEmailAddress, dateOfSampleCollection,
        timeOfCollection, collectedBy, weatherConditions, sampleContainerType,
        observations, parameters, labTestCertificatePath, rawLabSheetPath,
        samplingPointPhotosPaths, isSafe, nextStep, comments, signatureData,
        submissionDate, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectId, data.projectID, data.waterType, data.state, data.lga, data.community,
        data.gpsCoordinates, data.testerFullName, data.testerRole, data.testerLicenseNumber,
        data.testerPhoneNumber, data.testerEmailAddress, data.dateOfSampleCollection,
        data.timeOfCollection, data.collectedBy, data.weatherConditions, data.sampleContainerType,
        data.observations, JSON.stringify(data.parameters || []), data.labTestCertificatePath,
        data.rawLabSheetPath, JSON.stringify(data.samplingPointPhotosPaths || []), data.isSafe,
        data.nextStep, data.comments, data.signatureData, data.submissionDate, userId
      ]
    );
    return { ...data, id: result.insertId, projectId };
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