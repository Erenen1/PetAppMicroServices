import mongoose, { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    _id: mongoose.ObjectId;
    username: string;
    email: string;
    password: string;
    profilePhoto?: string;
    phoneNumber: number;
    address?: string;
    bio?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "İsim alanı boş geçilemez."],
        minLength: [2, "İsim 2 karakterden az olamaz."],
        maxLength: [20, "İsim 20 karakterden fazla olamaz."]
    },
    email: {
        type: String,
        required: [true, "Email alanı boş geçilemez."],
        minLength: [5, "Email 5 karakterden az olamaz."],
        maxLength: [100, "Email 100 karakterden fazla olamaz."],
        unique: true,
        match: [/.+\@.+\..+/, "Lütfen geçerli bir email adresi girin."]
    },
    password: {
        type: String,
        required: [true, "Şifre alanı boş geçilemez."]
    },
    profilePhoto: {
        type: String,
        minLength: [2, "Profil fotosu 2 karakterden az olamaz."],
        maxLength: [100, "Profil fotosu 100 karakterden fazla olamaz."]
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^\d{10,12}$/.test(v);
            },
            message: "Telefon numarası 10 ile 12 karakter arasında olmalıdır."
        }
    },
    address: {
        type: String,
        minLength: [2, "Adres 2 karakterden az olamaz."],
        maxLength: [200, "Adres 200 karakterden fazla olamaz."]
    },
    bio: {
        type: String,
        minLength: [2, "Biografi 2 karakterden az olamaz."],
        maxLength: [100, "Biografi 100 karakterden fazla olamaz."]
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true, versionKey: false })

export default model<IUser>("Users", userSchema);

import User from "./user";


export const getUserById = (_id: string) => User.findOne({ _id: _id });
export const getUserByEmail = (email: string) => User.findOne({ email: email });

export const updateUserById = (_id: string, values: Record<string, any>) => User.findByIdAndUpdate(_id, values);
export const deleteUserById = (_id: string) => User.findByIdAndDelete(_id);
export const createUser = (values: Record<string, any>) => new User(values).save().then(user => user.toObject());


