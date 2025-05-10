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


const express = require('express');
const router = express.Router();

// Import controllers
const FormStageAController = require('../controller/formStageA');
const FormStageBController = require('../controller/formStageB');
const FormStageCController = require('../controller/formStageC');
const MediaController = require('../controller/mediaController');

// Create controller instances
// const formStageAController = new FormStageAController();
// const formStageBController = new FormStageBController();
// const formStageCController = new FormStageCController();
// const mediaController = new MediaController();

// Import middlewares
const { upload, stageCUpload } = require('../middlewares/upload');
const { authenticate, protect, restrictTo } = require('../middlewares/authMiddleware');

// Verify critical imports
if (typeof authenticate !== 'function') {
  throw new Error('authenticate middleware is not properly imported');
}
if (typeof upload !== 'function' || typeof stageCUpload !== 'function') {
  throw new Error('Upload middleware is not properly imported');
}

// ======================
// Stage A Routes
// ======================
router.post('/stage-a',
  authenticate,
  upload,
  (req, res) => FormStageAController.create(req, res)
);

router.get('/stage-a/:projectId',
  authenticate,
  (req, res) => FormStageAController.getByProjectId(req, res)
);

router.put('/stage-a/:id',
  authenticate,
  upload,
  (req, res) => FormStageAController.update(req, res)
);

// ======================
// Stage B Routes
// ======================
router.post('/stage-b/:formStageAId',
  authenticate,
  (req, res) => FormStageBController.create(req, res)
);

router.get('/stage-b/:formStageAId',
  authenticate,
  (req, res) => FormStageBController.getByStageAId(req, res)
);

router.put('/stage-b/:id',
  authenticate,
  (req, res) => FormStageBController.update(req, res)
);

// ======================
// Stage C Routes
// ======================
router.post('/stage-c/:formStageBId',
  authenticate,
  stageCUpload,
  (req, res) => FormStageCController.create(req, res)
);

router.get('/stage-c/:formStageBId',
  authenticate,
  (req, res) => FormStageCController.getByStageBId(req, res)
);

router.put('/stage-c/:id',
  authenticate,
  stageCUpload,
  (req, res) => FormStageCController.update(req, res)
);

// ======================
// Media Routes
// ======================
router.delete('/media/:id',
  authenticate,
  (req, res) => MediaController.delete(req, res)
);

router.get('/media/form-stage-a/:formStageAId',
  authenticate,
  (req, res) => MediaController.getByFormStageAId(req, res)
);

module.exports = router;