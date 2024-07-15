import mongoose from "mongoose";
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: [true, "İsim alanı boş geçilemez."],
        minLength: [2, "İsim 2 karakterden az olamaz."],
        maxLength: [20, "İsim 20 karakterden fazla olamaz."]
    },
    genus: {
        type: String,
        enum: {
            values: ["cat", "dog"],
            message: "Hayvanın türü kedi ya da köpek olmalıdır."
        },
        required: [true, "Cinsiyet alanı boş geçilemez."],
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Cins male ya da female olmalıdır."
        },
        required: [true, "Cinsiyet alanı boş geçilemez."],
    },
    age: {
        type: Number,
        required: [true, "Yaş alanı boş geçilemez."],
        min: [0, "Hayvanın yaşı 0'dan küçük olamaz."],
        max: [20, "Hayvanın yaşı 20'den büyük olamaz."]
    },
    breed: {
        type: String,
        required: [true, "Hayvan ırkı alanı boş geçilemez."],
        minLength: [2, "Irk alanı 2 karakterden az olamaz."],
        maxLength: [20, "Irk alanı 20 karakterden fazla olamaz."]
    },
    color: {
        type: String,
        required: [true, "Hayvan rengi alanı boş geçilemez."],
        minLength: [2, "Hayvan rengi 2 karakterden az olamaz."],
        maxLength: [20, "Hayvan rengi 20 karakterden fazla olamaz."]
    },
    imageUrls: [{
        type: String,
        minLength: [2, "Fotoğraf alanı 2 karakterden az olamaz."],
        maxLength: [100, "Fotoğraf alanı 100 karakterden fazla olamaz."]
    }],
    duringEstrus: {
        type: Boolean,
        required: [true, "Kızgınlık döneminde mi alanı boş geçilemez."],
        default: false
    },
    personality: {
        type: String,
        required: [true, "Hayvanın kişilik özellikleri alanı boş geçilemez."],
        minLength: [2, "Hayvanın kişilik özellikleri alanı 2 karakterden az olamaz."],
        maxLength: [100, "Hayvanın kişilik özellikleri alanı 100 karakterden fazla olamaz."]
    },
    interest: {
        type: String,
        required: [true, "Hayvanın ilgi alanları alanı boş geçilemez."],
        minLength: [2, "Hayvanın ilgi alanları alanı 2 karakterden az olamaz."],
        maxLength: [100, "Hayvanın ilgi alanları alanı 100 karakterden fazla olamaz."]
    },
    vaccinations: {
        type: Boolean,
        required: [true, "Hayvanın aşıları tam mı? alanı boş geçilemez."],
        default: false
    },
    allergies: {
        type: String,
        required: [true, "Hayvanın alerjileri alanı boş geçilemez."],
        minLength: [2, "Hayvanın alerjileri alanı 2 karakterden az olamaz."],
        maxLength: [100, "Hayvanın alerjileri alanı 100 karakterden fazla olamaz."]
    },
    userId: {
        type: Schema.Types.ObjectId,
    }
}, { versionKey: false })

export default mongoose.model("Pets", petSchema);

import Pet from "./pet";


export const getPetsWithFilter = (filter?: any) => Pet.find(filter);
export const getPetById = (_id: string) => Pet.findOne({ _id: _id });

export const updatePetById = (_id: string, values: Record<string, any>) => Pet.findByIdAndUpdate(_id, values);
export const deletePetById = (_id: string) => Pet.findByIdAndDelete(_id);
export const createPet = (values: Record<string, any>) => new Pet(values).save().then(pet => pet.toObject());


