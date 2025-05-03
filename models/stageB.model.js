const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const FormStageB = sequelize.define('FormStageB', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  formStageAId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  drillingCompany: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drillingLicense: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permitNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permitIssueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  actualOverburden: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fracturedZone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weatheredZone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  depthDrilled: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drilledDiameter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drillingMethod: {
    type: DataTypes.ENUM('mud-drill', 'dthh', 'both'),
    allowNull: false
  },
  rods: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  casingDiameter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  casingType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  casingLength: {
    type: DataTypes.STRING,
    allowNull: true
  },
  casingCount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gravelPackingSize: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isSuccessful: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  depthInstalled: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dischargingRate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  waterCut: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  waterCutDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  waterCutTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  staticWaterLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'completed'),
    defaultValue: 'draft'
  }
}, {
  timestamps: true,
  paranoid: true
});

module.exports = FormStageB;