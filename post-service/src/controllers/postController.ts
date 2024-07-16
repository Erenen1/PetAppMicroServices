import express, { urlencoded } from "express";
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";
import axios from "axios";
import FormData from 'form-data';
import { PET_SERVICES, USER_SERVICES } from "../config/enum";
import Post, { getPostById, updatePostById, deletePostById, createPost } from "../models/post";
import { isValidMongoId } from "../utils/functions/isMongoId";


export const getAllPosts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { genus, gender, breed, duringEstrus, vaccinations, minAge, maxAge } = req.query;
    try {
        const petsResponse = await axios.get(`${PET_SERVICES.HOSTNAME}/api/pets`, {
            params: { genus, gender, breed, duringEstrus, vaccinations, minAge, maxAge }
        })

        let petIds = null;
        if (petsResponse.data.success) {
            petIds = petsResponse.data.data.map((pet: any) => pet._id);
        }

        const posts = await Post.find({ petId: { $in: petIds } });

        if (posts.length === 0) {
            throw new CustomError(404, "Not found", "İlanlar bulunamadı.");
        }

        return res.status(200).json(Response.successResponse(posts));
    } catch (error) {
        next(error);
    }
}
export const getPostDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postId = req.params.postId;
    const jwtToken = res.locals.jwtToken;
    try {
        if (!isValidMongoId(postId)) {
            throw new CustomError(400, "Validation error", "Post id geçersiz.");
        }
        const post = await getPostById(postId);
        if (!post) {
            throw new CustomError(404, "Not found", "İlan bulunamadı.");
        }
        const petResponse = await axios.get(`${PET_SERVICES.HOSTNAME}/api/pets/${post.petId}`)
        let pet = null;
        if (petResponse.data.success) {
            pet = petResponse.data.data;
        }
        const userResponse = await axios.get(`${USER_SERVICES.HOSTNAME}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        let user = null;
        if (userResponse.data.success) {
            user = userResponse.data.data;
        }


        const combinedResponse = {
            post,
            pet,
            user
        };

        return res.status(200).json(Response.successResponse(combinedResponse))

    } catch (error) {

        next(error);
    }
}


export const createPostApi = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;

    try {

        return res.status(200).json(Response.successResponse(null, "Profil güncellendi."))

    } catch (error) {

        next(error);
    }
}

export const updatePost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;

    try {
        return res.status(200).json(Response.successResponse(null, "Profile silindi."))

    } catch (error) {

        next(error);
    }
}
export const deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    const postId = req.params.postId
    const jwtToken = res.locals.jwtToken;
    try {
        if (!isValidMongoId(postId)) {
            throw new CustomError(400, "Validation error", "Post id geçersiz.");
        }
        const post = await getPostById(postId);
        if (!post) {
            throw new CustomError(404, "Not found", "İlan bulunamadı.");
        }
        if (post.userId !== userId) {
            throw new CustomError(401, "Unauthorized", "Erişim izniniz yok.");
        }
        const petResponse = await axios.delete(`${PET_SERVICES.HOSTNAME}/api/pets/${post.petId}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        let deletedPost = null;
        if(petResponse.data.success){
            deletedPost = await deletePostById(postId);
        }


        return res.status(200).json(Response.successResponse(deletedPost, "Profile silindi."))

    } catch (error) {

        next(error);
    }
}