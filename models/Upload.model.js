const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");

module.exports = () => {
  const Upload = sequelize.define('Upload', {
    stage: {
      type: DataTypes.ENUM('stageA', 'stageB', 'stageC'),
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING, // or ENUM if you want strict validation
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    projectId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Upload.associate = (models) => {
    Upload.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });

    Upload.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });
  };

  return Upload;
};
