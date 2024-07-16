import multer from "multer";
import express from "express";
import CustomError from "../utils/classes/CustomError";

const diskStorage = multer.diskStorage({

    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
    }
});

const memoryStorage = multer.memoryStorage();

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new CustomError(400, "Validation Error", 'Invalid file type. Only JPEG, PNG files are allowed.'), false);
    }
};

const upload = multer({
    storage:memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    },
    fileFilter: fileFilter // sadece jpeg ve png tipinde dosya alıyor.
})

export default upload;