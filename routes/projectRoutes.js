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
const formStageAController = new FormStageAController();
const formStageBController = new FormStageBController();
const formStageCController = new FormStageCController();
const mediaController = new MediaController();

// Import middlewares
const { upload, stageCUpload } = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');

// Verify critical imports are functions
if (typeof authMiddleware !== 'function') {
  throw new Error('authMiddleware is not a function');
}
if (typeof upload !== 'function') {
  throw new Error('upload middleware is not a function');
}
if (typeof stageCUpload !== 'function') {
  throw new Error('stageCUpload middleware is not a function');
}

// Stage A Routes
router.post('/stage-a',
  authMiddleware,
  upload,
  formStageAController.create.bind(formStageAController)
);

router.get('/stage-a/:projectId',
  authMiddleware,
  formStageAController.getByProjectId.bind(formStageAController)
);

router.put('/stage-a/:id',
  authMiddleware,
  upload,
  formStageAController.update.bind(formStageAController)
);

// Stage B Routes
router.post('/stage-b/:formStageAId',
  authMiddleware,
  formStageBController.create.bind(formStageBController)
);

router.get('/stage-b/:formStageAId',
  authMiddleware,
  formStageBController.getByStageAId.bind(formStageBController)
);

router.put('/stage-b/:id',
  authMiddleware,
  formStageBController.update.bind(formStageBController)
);

// Stage C Routes
router.post('/stage-c/:formStageBId',
  authMiddleware,
  stageCUpload,
  formStageCController.create.bind(formStageCController)
);

router.get('/stage-c/:formStageBId',
  authMiddleware,
  formStageCController.getByStageBId.bind(formStageCController)
);

router.put('/stage-c/:id',
  authMiddleware,
  stageCUpload,
  formStageCController.update.bind(formStageCController)
);

// Media Routes
router.delete('/media/:id',
  authMiddleware,
  mediaController.delete.bind(mediaController)
);

router.get('/media/form-stage-a/:formStageAId',
  authMiddleware,
  mediaController.getByFormStageAId.bind(mediaController)
);

module.exports = router;