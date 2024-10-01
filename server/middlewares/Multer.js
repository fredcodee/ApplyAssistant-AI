const multer = require('multer'); 
const path = require('path');


const destinationDir = path.join(__dirname, '..', 'files');

// Set up multer storage
const storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, destinationDir); // Destination directory
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});


const upload = multer({ storage });

module.exports = upload;
