const express = require('express');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const upload = require('../middlewares/multer');

router.post('/', upload.array('media', 10), async function(req, res) {
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'No files uploaded' 
        });
    }

    try {
        // Validate files
        for (const file of files) {
            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)) {
                throw new Error(`Invalid file type: ${file.originalname}`);
            }
            if (file.size > 5 * 1024 * 1024) {
                throw new Error(`File too large: ${file.originalname}`);
            }
        }

        // Parallel uploads
        const uploadResults = await Promise.all(files.map(async (file) => {
            try {
                return await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto"
                });
            } catch (err) {
                console.error(`Failed to upload ${file.originalname}:`, err);
                return { 
                    error: true, 
                    name: file.originalname,
                    message: err.message 
                };
            }
        }));

        const successfulUploads = uploadResults.filter(result => !result.error);

        res.status(200).json({
            success: true,
            message: `${successfulUploads.length} of ${files.length} files uploaded`,
            data: successfulUploads.map(result => ({
                url: result.secure_url,
                public_id: result.public_id,
                format: result.format,
                bytes: result.bytes
            })),
            failed: uploadResults.length - successfulUploads.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: err.message || 'Upload failed' 
        });
    } finally {
        // Clean up temp files
        files.forEach(file => {
            try {
                fs.unlinkSync(file.path);
            } catch (cleanupErr) {
                console.error('Failed to cleanup temp file:', file.path, cleanupErr);
            }
        });
    }
});

module.exports = router;