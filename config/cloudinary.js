const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

/**
 * Uploads a file to Cloudinary with timeout protection
 * @param {Object} file - Multer file object
 * @param {Object} options - Cloudinary upload options
 * @param {number} timeoutMs - Upload timeout in milliseconds
 * @returns {Promise<Object>}
 */
const uploadToCloudinary = (file, options = {}, timeoutMs = 30000) => {
  const uploadOptions = {
    folder: 'project_documents',
    resource_type: 'auto',
    ...options
  };

  return Promise.race([
    new Promise((resolve, reject) => {
      if (file.buffer) {
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
        uploadStream.end(file.buffer);

      } else if (file.path) {
        cloudinary.uploader.upload(file.path, uploadOptions)
          .then(resolve)
          .catch(err => {
            console.error('Cloudinary upload error:', err);
            reject(new Error('Failed to upload file to Cloudinary'));
          });

      } else {
        reject(new Error('Invalid file format - no buffer or path found'));
      }
    }),

    // Timeout rejection after specified milliseconds
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Cloudinary upload timed out')), timeoutMs)
    )
  ]);
};

/**
 * Deletes a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID or URL
 * @returns {Promise<Object>}
 */
const deleteFromCloudinary = async (publicId) => {
  try {
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
