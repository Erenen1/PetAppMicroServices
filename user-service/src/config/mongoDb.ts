import mongoose from "mongoose";

export default () => {
    if (typeof process.env.MONGO_URI === "string") {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB baglantisi basarili");
    }
    else {
        process.exit(1);
    }
}