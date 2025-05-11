const express = require("express");
const router = express.Router();

// Import controllers
const FormStageAController = require("../controller/formStageA");
const FormStageBController = require("../controller/formStageB");
const FormStageCController = require("../controller/formStageC");
const MediaController = require("../controller/mediaController");

// Import middlewares
const { upload, stageCUpload } = require('../middlewares/upload');
const { authenticate, restrictTo } = require('../middlewares/authMiddleware');
const authController = require("../controller/authController");

// ======================
// Stage A Routes
router.post('/stage-a',
  authController.protect,
  // restrictTo('admin', 'project-manager', 'field-engineer'), // Only these roles can create
  upload,
  FormStageAController.create.bind(FormStageAController)
);

router.get('/stage-a/:projectId',
  authenticate,
  restrictTo('admin', 'project-manager', 'field-engineer', 'client'), // Clients can view
  FormStageAController.getByProjectId.bind(FormStageAController)
);

router.put('/stage-a/:id',
  authenticate,
  // restrictTo('admin', 'project-manager'), // Only admins and PMs can update
  upload,
  FormStageAController.update.bind(FormStageAController)
);

// ======================
// Stage B Routes
router.post('/stage-b/:formStageAId',
  authenticate,
  // restrictTo('admin', 'project-manager', 'field-engineer'),
  FormStageBController.create.bind(FormStageBController)
);

router.get('/stage-b/:formStageAId',
  authenticate,
  restrictTo('admin', 'project-manager', 'field-engineer', 'client'),
  FormStageBController.getByStageAId.bind(FormStageBController)
);

router.put('/stage-b/:id',
  authenticate,
  restrictTo('admin', 'project-manager'),
  FormStageBController.update.bind(FormStageBController)
);

// ======================
// Stage C Routes
router.post('/stage-c/:formStageBId',
  authenticate,
  // restrictTo('admin', 'project-manager', 'field-engineer'),
  stageCUpload,
  FormStageCController.create.bind(FormStageCController)
);

router.get('/stage-c/:formStageBId',
  authenticate,
  restrictTo('admin', 'project-manager', 'field-engineer', 'client'),
  FormStageCController.getByStageBId.bind(FormStageCController)
);

router.put('/stage-c/:id',
  authenticate,
  restrictTo('admin', 'project-manager'),
  stageCUpload,
  FormStageCController.update.bind(FormStageCController)
);

// ======================
// Media Routes
router.delete('/media/:id',
  authenticate,
  restrictTo('admin', 'project-manager'), // Only admins/PMs can delete
  MediaController.delete.bind(MediaController)
);

router.get('/media/form-stage-a/:formStageAId',
  authenticate,
  restrictTo('admin', 'project-manager', 'field-engineer', 'client'),
  MediaController.getByFormStageAId.bind(MediaController)
);

module.exports = router;