import express from "express";
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";
import Pet, { createPet, deletePetById, getPetById, updatePetById } from "../models/pet"
import FormData from "form-data";
import axios from "axios"
import { FILE_UPLOAD_SERVICES } from "../config/enum";
import { isValidMongoId } from "../utils/functions/isMongoId";

export const getAllPets = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { genus, gender, breed, duringEstrus, vaccinations, minAge, maxAge } = req.query;
    try {
        const filter: any = {};
        if (genus) filter.genus = genus;
        if (gender) filter.gender = gender;
        if (breed) filter.breed = breed;
        if (duringEstrus) filter.duringEstrus = duringEstrus;
        if (vaccinations) filter.vaccinations = vaccinations;
        if (minAge) filter.minAge = { $gte: minAge };
        if (maxAge) filter.maxAge = { $lte: maxAge };

        // const pets = await Pet.find(filter).select("_id");
        // const petIds = pets.map(pet => pet._id);
        // console.log(petIds);
        // const posts = await Post.find({ petId: { $in: petIds } })
        // yada 
        const pets = await Pet.find(filter)
        if (pets.length === 0) {
            throw new CustomError(404, "Not found", "Evcil hayvan bulunamadı.");
        }

        return res.status(200).json(Response.successResponse(pets))
    } catch (error) {
        next(error);
    }
}


export const getPetDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId
    const petId = req.params.petId;
    try {
        if (!isValidMongoId(petId)) {
            throw new CustomError(400, "Validation error", "Pet id geçersiz.")
        }
        // validation yap...
        const pet = await getPetById(petId);
        if (!pet) {
            throw new CustomError(404, "Not found", "Evcil hayvan bulunamadı.")
        }


        return res.status(201).json(Response.successResponse(pet))
    } catch (error) {
        next(error);
    }
}

export const createPetApi = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { petName, genus, gender, age, breed, color, duringEstrus,
        personality, interest, vaccinations, allergies } = req.body;
    const jwtToken = res.locals.jwtToken;
    const files = req.files;
    const userId = res.locals.userId
    try {
        // validation yap...
        let imageUrls: string[] = [];
        if (files && Array.isArray(files)) {
            const form = new FormData();
            files.forEach(file => {

                form.append("imageFiles", file.buffer, file.originalname);
            })
            const response = await axios.post(`${FILE_UPLOAD_SERVICES.HOSTNAME}/api/upload/multiple`, form, {
                headers: {
                    ...form.getHeaders(),
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
            console.log(response.data)
            if (response.data.success) {
                imageUrls = response.data.data;
            }
        }
        const newPet = await createPet({
            name: petName,
            genus,
            gender,
            age,
            breed,
            color,
            duringEstrus,
            imageUrls,
            personality,
            interest,
            vaccinations,
            allergies,
            userId
        })

        return res.status(201).json(Response.successResponse(newPet, "Evcil hayvan başarıyla oluşturuldu."))
    } catch (error) {
        next(error);
    }
}

export const updatePet = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { petName, genus, gender, age, breed, color, duringEstrus,
        personality, interest, vaccinations, allergies } = req.body;
    const petId = req.params.petId;
    const userId = res.locals.userId;
    try {
        if (!isValidMongoId(petId)) {
            throw new CustomError(400, "Validation error", "Pet id geçersiz.")
        }
        const pet = await getPetById(petId);
        if(!pet){
            throw new CustomError(404,"Not found","Evcil hayvan bulunamadı.")
        }
        if(pet.userId !== userId){
            throw new CustomError(401, "Unauthorized", "Bu işlemi yapabilmek için yeterli yetkiye sahip değilsiniz.")
        }
        const updatedPet = await updatePetById(petId, {
            name: petName,
            genus,
            gender,
            age,
            breed,
            color,
            duringEstrus,
            personality,
            interest,
            vaccinations,
            allergies,
        })
        return res.status(201).json(Response.successResponse(updatedPet, "Post başarıyla oluşturuldu."))
    } catch (error) {
        next(error);
    }
}



export const deletePet = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const petId = req.params.petId;
    const userId = res.locals.userId;
    try {
        if (!isValidMongoId(petId)) {
            throw new CustomError(400, "Validation error", "Pet id geçersiz.")
        }

        const pet = await getPetById(petId);
        if (!pet) {
            throw new CustomError(404, "Not found", "Evcil hayvan bulunamadı.")
        }
        if (pet.userId?.toString() !== userId) {
            throw new CustomError(401, "Unauthorized", "Bu işlemi yapabilmek için yeterli yetkiye sahip değilsiniz.")
        }
        const deletedPet = await deletePetById(petId);

        return res.status(200).json(Response.successResponse(deletePet, "Post başarıyla silindi."))

    } catch (error) {

        next(error);
    }
}