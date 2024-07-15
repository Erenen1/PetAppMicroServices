import express from "express";
const router = express.Router();
import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController";
import upload from "../helpers/fileUpload"

router.get("/", getProfile)
router.put("/", upload.single("imageFile"), updateProfile)
router.delete("/", deleteProfile)


export default router;