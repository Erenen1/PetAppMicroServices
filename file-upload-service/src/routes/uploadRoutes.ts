import express from "express";
const router = express.Router();
import { uploadMultipleFiles, uploadSingleFile } from "../controllers/uploadController"
import upload from "../helpers/fileUpload";
import isAuth from "../middlewares/isAuth";


router.post("/multiple",isAuth, upload.array("imageFiles", 5), uploadMultipleFiles);
router.post("/single",isAuth, upload.single("imageFile"), uploadSingleFile);


export default router;