import express from "express";
import { verifyJwtToken } from "../utils/functions/auth";
import CustomError from "../utils/classes/CustomError";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            throw new CustomError(403, "Forbidden", "Giriş yapınız.");
        }
        const jwtToken = authorization.split(" ")[1];
        if (!jwtToken) {
            throw new CustomError(403, "Forbidden", "Giriş yapınız.");
        }
        const decodedToken = verifyJwtToken(jwtToken);
        if (!decodedToken || typeof decodedToken === "string") {
            throw new CustomError(403, "Forbidden", "Giriş yapınız.");
        }
        res.locals.userId = decodedToken.userId;
        res.locals.username = decodedToken.username;
        res.locals.email = decodedToken.email;
        res.locals.isAdmin = decodedToken.isAdmin;
        return next();

    } catch (error) {
        next(error);
    }
}