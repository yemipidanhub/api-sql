module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('draft', 'ongoing', 'completed'),
        defaultValue: 'draft'
      }
    }, {
      timestamps: true
    });
  
    Project.associate = (models) => {
      Project.hasOne(models.FormStageA, { foreignKey: 'projectId' });
      Project.hasOne(models.FormStageB, { foreignKey: 'projectId' });
    };
  
    return Project;
  };