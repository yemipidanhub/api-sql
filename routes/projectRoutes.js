// const express = require('express');
// const router = express.Router();
// const {createForm, getForm, updateStageA, updateStageB, updateStageC, submitForm, getAllForms } = require('../controller/projectController');
// const { authenticate } = require('../middlewares/authMiddleware');
// const { upload, handleUploadErrors } = require('../middlewares/upload');

// // Create new form (Stage A)
// router.post('/', authenticate, createForm);

// // Get form by ID
// router.get('/:id', authenticate, getForm);

// // Update Stage A
// router.put('/:id/stage-a', authenticate, updateStageA);

// // Update Stage B
// router.put('/:id/stage-b', authenticate, updateStageB);

// // Update Stage C with file uploads
// router.put(
//   '/:id/stage-c',
//   authenticate,
//   upload.fields([
//     { name: 'labTestCertificate', maxCount: 1 },
//     { name: 'rawLabSheet', maxCount: 1 },
//     { name: 'samplingPointPhotos', maxCount: 10 }
//   ]),
//   handleUploadErrors,
//   updateStageC
// );

// // Submit final form
// router.post('/:id/submit', authenticate, submitForm);

// // router.get('/', authenticate, getAllForms);

// module.exports = router;

const express = require("express");
const router = express.Router();

// Import controllers
const FormStageAController = require("../controller/formStageA");
const FormStageBController = require("../controller/formStageB");
const FormStageCController = require("../controller/formStageC");
const MediaController = require("../controller/mediaController");

// Create controller instances
// const formStageAController = new FormStageAController();
// const formStageBController = new FormStageBController();
// const formStageCController = new FormStageCController();
// const mediaController = new MediaController();

// Import middlewares
const { upload, stageCUpload } = require("../middlewares/upload");
// const authMiddleware = require('../middlewares/authMiddleware');
const {
  authenticate,
  protect,
  restrictTo,
} = require("../middlewares/authMiddleware");

// Verify critical imports are functions
// if (typeof authMiddleware !== 'function') {
//   throw new Error('authMiddleware is not a function');
// }
if (typeof upload !== "function") {
  throw new Error("upload middleware is not a function");
}
if (typeof stageCUpload !== "function") {
  throw new Error("stageCUpload middleware is not a function");
}

// Stage A Routes
router.post("/stage-a", authenticate, upload, FormStageAController.create);

router.get(
  "/stage-a/:projectId",
  authenticate,
  FormStageAController.getByProjectId
);

router.put("/stage-a/:id", authenticate, upload, FormStageAController.update);

// Stage B Routes
router.post(
  "/stage-b/:formStageAId",
  authenticate,
  FormStageBController.create
);

router.get(
  "/stage-b/:formStageAId",
  authenticate,
  FormStageBController.getByStageAId
);

router.put("/stage-b/:id", authenticate, FormStageBController.update);

// Stage C Routes
router.post(
  "/stage-c/:formStageBId",
  authenticate,
  stageCUpload,
  FormStageCController.create
);

router.get(
  "/stage-c/:formStageBId",
  authenticate,
  FormStageCController.getByStageBId
);

router.put(
  "/stage-c/:id",
  authenticate,
  stageCUpload,
  FormStageCController.update
);

// Media Routes
router.delete("/media/:id", authenticate, MediaController.delete);

router.get(
  "/media/form-stage-a/:formStageAId",
  authenticate,
  MediaController.getByFormStageAId
);
router.get(
  "/media/form-stage-b/:formStageBId",
  authenticate,
  MediaController.getByFormStageAId
);

module.exports = router;
