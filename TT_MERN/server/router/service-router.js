import express from 'express';
import services from '../controllers/service-controller.js';
import multer from 'multer';

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    } 
});

const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.single("clothImage"), services);

export default router;