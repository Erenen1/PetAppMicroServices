import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Başlık alanı boş geçilemez."],
        minLength: [2, "Başlık 2 karakterden az olamaz."],
        maxLength: [20, "Başlık 20 karakterden fazla olamaz."]
    },
    description: {
        type: String,
        required: [true, "Açıklama alanı boş geçilemez."],
        minLength: [2, "Açıklama 2 karakterden az olamaz."],
        maxLength: [200, "Açıklama 200 karakterden fazla olamaz."]
    },
    profileImage: {
        type: String,
        required: true
    },
    locationId: {
        type: Schema.Types.ObjectId,
        ref: "Locations"
    },
    petId: {
        type: Schema.Types.ObjectId,
        ref: "Pets"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("Posts", postSchema);

import Post from "./post";


export const getPostById = (_id: string) => Post.findOne({ _id: _id });

export const updatePostById = (_id: string, values: Record<string, any>) => Post.findByIdAndUpdate(_id, values);
export const deletePostById = (_id: string) => Post.findByIdAndDelete(_id);
export const createPost = (values: Record<string, any>) => new Post(values).save().then(post => post.toObject());


