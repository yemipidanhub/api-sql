// const multer = require('multer');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/tmp/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${uuidv4()}${ext}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     'image/jpeg', 
//     'image/png', 
//     'application/pdf',
//     'image/jpg'
//   ];
  
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB
//   }
// });

// // Middleware to handle file upload errors
// exports.handleUploadErrors = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({
//       error: {
//         message: err.message,
//         details: err.code === 'LIMIT_FILE_SIZE' 
//           ? 'File size exceeds 5MB limit' 
//           : 'File upload error'
//       }
//     });
//   } else if (err) {
//     return res.status(400).json({
//       error: {
//         message: err.message
//       }
//     });
//   }
//   next();
// };

// exports.upload = upload;


const multer = require('multer');
const path = require('path');

// Configure storage for general file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// For Stage C specific file uploads
const stageCUpload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and Word documents are allowed'));
    }
  }
}).fields([
  { name: 'labTestCertificate', maxCount: 1 },
  { name: 'rawLabSheet', maxCount: 1 },
  { name: 'samplingPointPhotos', maxCount: 5 }
]);

// For general file uploads (Stage A)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
}).array('files', 5); // Max 5 files

module.exports = {
  upload,
  stageCUpload
};