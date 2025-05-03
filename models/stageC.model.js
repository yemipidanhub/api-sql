const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const FormStageC = sequelize.define('FormStageC', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  formStageBId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  projectID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  waterType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  community: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gpsCoordinates: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testerFullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testerRole: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testerLicenseNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testerPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testerEmailAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  dateOfSampleCollection: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  timeOfCollection: {
    type: DataTypes.TIME,
    allowNull: false
  },
  collectedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weatherConditions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sampleContainerType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  parameters: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  labTestCertificatePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rawLabSheetPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  samplingPointPhotosPaths: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  isSafe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nextStep: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  signatureData: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  submissionDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'submitted', 'approved', 'rejected'),
    defaultValue: 'draft'
  }
}, {
  timestamps: true,
  paranoid: true
});

module.exports = FormStageC;