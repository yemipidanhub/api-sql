const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadToCloudinary = async (file, folderPath) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `project-docs/${folderPath}`,
      resource_type: 'auto'
    });
    
    // Remove temp file after upload
    fs.unlinkSync(file.path);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format
    };
  } catch (error) {
    // Clean up temp file if upload fails
    if (file.path) fs.unlinkSync(file.path);
    throw error;
  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error;
  }
};