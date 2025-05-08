const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

module.exports = (sequelize, DataTypes) => {
const FormStageA = sequelize.define('FormStageA', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  projectType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agencyName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  town: {
    type: DataTypes.STRING,
    allowNull: false
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  consultantName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  consultantPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  consultantEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  consultantLicense: {
    type: DataTypes.STRING,
    allowNull: true
  },
  consultantAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimatedOverburden: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimatedDepth: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimatedFractureDepth: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimatedWeatheredZone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  curveType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessibility: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  reasonUnsuccessful: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'completed'),
    defaultValue: 'draft'
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: 'form_stage_a'
});

FormStageA.associate = (models) => {
  FormStageA.belongsTo(models.Project, { foreignKey: 'projectId' });
  FormStageA.hasOne(models.FormStageB, { foreignKey: 'formStageAId', as: 'stageB' });
};


return FormStageA;
};