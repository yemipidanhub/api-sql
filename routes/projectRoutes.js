const express = require('express');
const router = express.Router();
const {createForm, getForm, updateStageA, updateStageB, updateStageC, submitForm, getAllForms } = require('../controller/projectController');
const { authenticate } = require('../middlewares/authMiddleware');
const { upload, handleUploadErrors } = require('../middlewares/upload');

// Create new form (Stage A)
router.post('/', authenticate, createForm);

// Get form by ID
router.get('/:id', authenticate, getForm);

// Update Stage A
router.put('/:id/stage-a', authenticate, updateStageA);

// Update Stage B
router.put('/:id/stage-b', authenticate, updateStageB);

// Update Stage C with file uploads
router.put(
  '/:id/stage-c',
  authenticate,
  upload.fields([
    { name: 'labTestCertificate', maxCount: 1 },
    { name: 'rawLabSheet', maxCount: 1 },
    { name: 'samplingPointPhotos', maxCount: 10 }
  ]),
  handleUploadErrors,
  updateStageC
);

// Submit final form
router.post('/:id/submit', authenticate, submitForm);

// router.get('/', authenticate, getAllForms);

module.exports = router;