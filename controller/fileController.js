const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Save uploaded file
exports.saveFile = async (file, subfolder = '') => {
  await ensureUploadDir();
  
  const folderPath = path.join(uploadDir, subfolder);
  await fs.mkdir(folderPath, { recursive: true });
  
  const fileExt = path.extname(file.originalname);
  const filename = `${uuidv4()}${fileExt}`;
  const filepath = path.join(folderPath, filename);
  
  await fs.rename(file.path, filepath);
  
  return path.join(subfolder, filename);
};

// Delete file
exports.deleteFile = async (filepath) => {
  if (!filepath) return;
  
  const fullPath = path.join(uploadDir, filepath);
  try {
    await fs.unlink(fullPath);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
};