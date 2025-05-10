// module.exports = (sequelize, DataTypes) => {
//     const Project = sequelize.define('Project', {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//       },
//       userId: {
//         type: DataTypes.UUID,
//         allowNull: false
//       },
//       status: {
//         type: DataTypes.ENUM('draft', 'ongoing', 'completed'),
//         defaultValue: 'draft'
//       }
//     }, {
//       timestamps: true
//     });
  
//     Project.associate = (models) => {
//       Project.hasOne(models.FormStageA, { foreignKey: 'projectId' });
//       Project.hasOne(models.FormStageB, { foreignKey: 'projectId' });
//     };
  
//     return Project;
//   };

const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// const FormStageA = require('./stageA.model')(sequelize, Sequelize.DataTypes);
// const FormStageB = require('./stageB.model')(sequelize, Sequelize.DataTypes);
// const FormStageC = require('./stageC.model')(sequelize, Sequelize.DataTypes);
// const Upload = require('./Upload.model')(sequelize, Sequelize.DataTypes);

// Define relationships
FormStageA.hasOne(FormStageB, { foreignKey: 'formStageAId' });
FormStageB.belongsTo(FormStageA, { foreignKey: 'formStageAId' });

FormStageB.hasOne(FormStageC, { foreignKey: 'formStageBId' });
FormStageC.belongsTo(FormStageB, { foreignKey: 'formStageBId' });

module.exports = {
  sequelize,
  FormStageA,
  FormStageB,
  FormStageC,
  // Upload
};