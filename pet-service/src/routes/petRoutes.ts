import express from "express";
const router = express.Router();
import { getAllPets, deletePet, createPetApi, getPetDetail, updatePet } from "../controllers/petController";
import isAuth from "../middlewares/isAuth";
import upload from "../helpers/fileUpload";

router.get("/:petId", getPetDetail);
router.put("/:petId", isAuth, updatePet);
router.delete("/:petId", isAuth, deletePet);
router.get("/", getAllPets);
router.post("/", isAuth, upload.array("imageFiles", 5), createPetApi);


export default router;