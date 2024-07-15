import express from "express";
import { sha256Hash, compareHash, createJwt } from "../utils/functions/auth";
import { getUserByEmail, createUser } from "../models/user"
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password } = req.body
    try {
        //validate
        const user = await getUserByEmail(email);
        if (!user) {
            throw new CustomError(400, "Bad request", "Email ya da şifre yanlış.");
        }
        const isMatch: boolean = compareHash(password, user.password);
        if (!isMatch) {
            throw new CustomError(400, "Bad request", "Email ya da şifre yanlış.");
        }
        const token = createJwt(user._id.toString(), user.username, user.email, user.isAdmin);
        return res.status(302).json(Response.successResponse(token, "Login islemi basarili."));
    } catch (error) {
        next(error);
    }
}

export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, email, password, phoneNumber } = req.body;
    try {
        //validate 
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            throw new CustomError(400, "Bad request", "Bu email adresini alamazsın.");
        }
        const hashedPassword = sha256Hash(password);
        await createUser({
            username,
            email,
            password: hashedPassword,
            phoneNumber
        })

        return res.status(201).json(Response.successResponse(null, "Hesap başarıyla oluşturuldu."))
    } catch (error) {
        next(error);
    }
}
