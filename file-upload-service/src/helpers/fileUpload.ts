import multer from "multer"
import path from "path"
import fs from "fs";
import express from "express";
import CustomError from "../utils/classes/CustomError";

const maxSize = 2 * 1024 * 1024;
export const UPLOAD_DIR = path.join(__dirname, "../../", "uploads")
console.log(UPLOAD_DIR)

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}


// Yüklenen dosyaların saklanacağı yer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adını benzersiz yap
    },
});

const fileFilter = (req: express.Request, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new CustomError(400, "Validation Error", 'Geçersiz dosya formatı. Sadece jpeg, png dosyaları yükleyebilirsin.'), false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: fileFilter
});


export default upload;