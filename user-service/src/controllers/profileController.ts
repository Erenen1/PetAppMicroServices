import express, { urlencoded } from "express";
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";
import User, { deleteUserById, getUserById, updateUserById } from "../models/user";
import axios from "axios";
import FormData from 'form-data';
import { FILE_UPLOAD_SERVICES } from "../config/enum";


export const getProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    try {
        const user = await User.findOne({ _id: userId }, { password: 0 })
        if (!user) {
            throw new CustomError(403, "Forbidden", "Lütfen giriş yapınız.");
        }

        return res.status(200).json(Response.successResponse(user))
    } catch (error) {
        next(error);
    }
}


export const updateProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    const jwtToken = res.locals.jwtToken
    const file = req.file;
    const { address, bio } = req.body;
    try {
        let imageUrl = undefined;
        if (file) {

            const form = new FormData();
            form.append("imageFile", file.buffer, file.originalname);
            const response = await axios.post(`${FILE_UPLOAD_SERVICES.HOSTNAME}/api/upload/single`, form, {
                headers: {
                    ...form.getHeaders(),
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
            if (response.data.success) {
                imageUrl = response.data.data;
            }
        }
        await updateUserById(userId, {
            profilePhoto: imageUrl,
            address,
            bio
        })
        return res.status(200).json(Response.successResponse(null, "Profil güncellendi."))

    } catch (error) {

        next(error);
    }
}

export const deleteProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;

    try {
        const user = await getUserById(userId);
        if(!user){
            throw new CustomError(400,"Forbidden","Giriş yapınız lütfen.");
        }
        await deleteUserById(userId);

        return res.status(200).json(Response.successResponse(null, "Profile silindi."))

    } catch (error) {

        next(error);
    }
}