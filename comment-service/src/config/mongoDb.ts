import mongoose from "mongoose";

export default async() => {
    if (typeof process.env.MONGO_URI === "string") {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB baglantisi basarili");
    }
    else {
        process.exit(1);
    }
}