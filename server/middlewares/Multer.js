import multer, { diskStorage, memoryStorage } from 'multer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Save to destination
const destinationDir = join(__dirname, '..', 'files');

// Set up multer storage
const storage = memoryStorage({
    destination: function(req, file, cb) {
        cb(null, destinationDir); // Destination directory
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

// Initialize multer upload middleware
const upload = multer({ storage });

export default upload;
