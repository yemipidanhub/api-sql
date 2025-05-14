const express = require("express");
const router = express.Router();

// Import controllers
const FormStageAController = require("../controller/formStageA");
const FormStageBController = require("../controller/formStageB");
const FormStageCController = require("../controller/formStageC");
const MediaController = require("../controller/mediaController");

// Import middlewares
const { upload, stageCUpload } = require("../middlewares/upload");
const { authenticate, restrictTo } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");
const multer = require("multer");
const uploadMulter = multer();

// ======================
// Stage A Routes
router.post(
  "/stage-a",
  authController.protect,
  // restrictTo('admin', 'project-manager', 'field-engineer'), // Only these roles can create
  upload,
  FormStageAController.create.bind(FormStageAController)
);

router.post(
  "/stage-a/fetchUserProjects",
  authController.protect,
  FormStageAController.fetchUserProjects.bind(FormStageAController)
);

// to use this, send projectId within your form
router.get(
  "/stage-a/:projectId",
  // authController.protect,
  FormStageAController.getByProjectId.bind(FormStageAController)
);

// send id within form as idProject
router.put(
  "/stage-a/idProject",
  authenticate,
  upload,
  FormStageAController.update.bind(FormStageAController)
);

// ======================
// Stage B Routes
// router.post('/stage-b/:formStageAId',
//   authenticate,
//   // restrictTo('admin', 'project-manager', 'field-engineer'),
//   upload,
//   FormStageBController.create.bind(FormStageBController)
// );
router.post(
  "/stage-b",
  authenticate,
  // restrictTo('admin', 'project-manager', 'field-engineer'),
  upload,
  FormStageBController.create.bind(FormStageBController)
);

// append formStageAId to form
router.get(
  "/stage-b/formStageAId",
  authenticate,
  restrictTo("admin", "project-manager", "field-engineer", "client"),
  FormStageBController.getByStageAId.bind(FormStageBController)
);

router.put(
  "/stage-b/idProject",
  authenticate,
  restrictTo("admin", "project-manager"),
  FormStageBController.update.bind(FormStageBController)
);

// ======================
// Stage C Routes
// add the formStageBId to form body
router.post(
  "/stage-c/formStageBId",
  authenticate,
  // restrictTo('admin', 'project-manager', 'field-engineer'),
  stageCUpload,
  FormStageCController.create.bind(FormStageCController)
);

router.get(
  "/stage-c/AdminGetFormStageBId",
  authenticate,
  restrictTo("admin", "project-manager", "field-engineer", "client"),
  FormStageCController.getByStageBId.bind(FormStageCController)
);

router.put(
  "/stage-c/idProject",
  authenticate,
  restrictTo("admin", "project-manager"),
  stageCUpload,
  FormStageCController.update.bind(FormStageCController)
);

// ======================
// Media Routes
router.delete(
  "/media/idProject",
  authenticate,
  restrictTo("admin", "project-manager"), // Only admins/PMs can delete
  MediaController.delete.bind(MediaController)
);

router.get(
  "/media/form-stage-a/formStageAId",
  authenticate,
  restrictTo("admin", "project-manager", "field-engineer", "client"),
  MediaController.getByFormStageAId.bind(MediaController)
);

module.exports = router;
