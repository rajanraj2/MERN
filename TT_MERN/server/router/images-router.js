import express from 'express';
import path from 'path'; // Import path module
import fs from 'fs'; // Import fs module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Middleware for getting images
router.get('/', (req, res) => {
    // console.log('GET request received at /api/getImages');
    const imagesDirectory = path.join(__dirname, '..', 'uploads');
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            return res.status(500).send({ error: 'Internal server error' });
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.send({ images: imageFiles });
    });
    // console.log('GET request processed successfully');
});


export default router;
