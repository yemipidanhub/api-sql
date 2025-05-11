const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Always use HTTPS
});

/**
 * Uploads a file to Cloudinary
 * @param {Object} file - Multer file object with buffer or path
 * @param {Object} options - Additional Cloudinary options
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    // Default options
    const uploadOptions = {
      folder: 'project_documents',
      resource_type: 'auto', // Auto-detect image/video/raw
      ...options
    };

    // Create upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(new Error('Failed to upload file to Cloudinary'));
        } else {
          resolve(result);
        }
      }
    );

    // Handle both buffer and temp file uploads
    if (file.buffer) {
      // Memory storage - stream the buffer
      uploadStream.end(file.buffer);
    } else if (file.path) {
      // Disk storage - upload from temp path
      cloudinary.uploader.upload(file.path, uploadOptions)
        .then(resolve)
        .catch(reject);
    } else {
      reject(new Error('Invalid file format - no buffer or path found'));
    }
  });
};

/**
 * Deletes a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID or URL
 * @returns {Promise<Object>} Cloudinary deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    // Extract public ID if URL was provided
    if (publicId.includes('cloudinary.com')) {
      publicId = publicId.split('/').pop().split('.')[0];
    }

    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary
};