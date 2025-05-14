const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/tmp';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Supported file types
const allowedTypes = {
  image: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  document: ['application/pdf', 'application/msword', 
             'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-flv', 'video/webm']
};

// Combined allowed types
const allAllowedTypes = [
  ...allowedTypes.image,
  ...allowedTypes.document,
  ...allowedTypes.video
];

// MEMORY STORAGE (Recommended for Cloudinary)
const memoryStorage = multer.memoryStorage();

// DISK STORAGE (Alternative)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


// File type validation
const fileValidator = (file) => {
  const valid = allAllowedTypes.includes(file.mimetype);
  if (!valid) {
    throw new Error(`Invalid file type. Allowed types: ${Object.keys(allowedTypes).join(', ')}`);
  }
  return valid;
};

// General upload (memory storage recommended)
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      fileValidator(file);
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
}).array('files', 5);

// Stage C upload
const stageCUpload = multer({
  storage: memoryStorage,
  fileFilter: (req, file, cb) => {
    try {
      if (['labTestCertificate', 'rawLabSheet'].includes(file.fieldname)) {
        if (!allowedTypes.document.includes(file.mimetype)) {
          throw new Error(`${file.fieldname} must be a document (PDF or Word)`);
        }
      } else if (file.fieldname === 'samplingPointPhotos') {
        if (![...allowedTypes.image, ...allowedTypes.video].includes(file.mimetype)) {
          throw new Error('Sampling photos must be images (JPEG, PNG) or videos (MP4)');
        }
      }
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }
}).fields([
  { name: 'labTestCertificate', maxCount: 1 },
  { name: 'rawLabSheet', maxCount: 1 },
  { name: 'samplingPointPhotos', maxCount: 5 }
]);

// Error handling middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      status: 'error',
      message: err.code === 'LIMIT_FILE_SIZE' 
        ? 'File too large' 
        : err.message 
    });
  } else if (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
  next();
};

module.exports = {
  upload,
  stageCUpload,
  handleUploadErrors
};