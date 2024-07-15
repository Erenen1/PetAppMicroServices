import express from "express";
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";

export const uploadSingleFile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const imageName = req.file ? req.file.filename : null;
    try {
        if (!imageName) {
            throw new CustomError(400, "Validation error", "Resim ismini değiştirip tekrar deneyiniz.")
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

        return res.status(201).json(Response.successResponse(imageUrl, "Dosya başarıyla eklendi."));
    } catch (error) {
        next(error);
    }
}

export const uploadMultipleFiles = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const files: any = req.files ? req.files : null;
    try {
        if (!files || files.length === 0) {
            throw new CustomError(400, "Validation error", "Resim yükleme kısmını yeniden deneyiniz.")
        }
        const imageUrls = files.map((file: { filename: any; }) => `${req.protocol}://${req.get('host')}/uploads/` + file.filename);
        return res.status(201).json(Response.successResponse(imageUrls, "Dosyalar başarıyla eklendi."))
    } catch (error) {
        next(error);
    }
}
