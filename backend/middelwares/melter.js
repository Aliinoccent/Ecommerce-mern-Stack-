const multer = require('multer');
const path = require('path');

// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where images should be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Ensure that each file has a unique name
        cb(null, Date.now() +file.fieldname+ path.extname(file.originalname));
    }
});

// File filter to check if the uploaded file is an image
const fileFilter = (req, file, cb) => {
    // Accept only image files (jpeg, png, etc.)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB
    fileFilter: fileFilter
});

module.exports = upload;
