import dotenv from "dotenv";
dotenv.config({
    path:`./.env.${process.env.NODE_ENV}`
})

process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1);
})

import express from "express";
const app = express();

import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

import uploadRoutes from "./routes/uploadRoutes"
import {UPLOAD_DIR} from "./helpers/fileUpload"

app.use("/", uploadRoutes);
app.use("/static",express.static(UPLOAD_DIR));

import errorHandler from "./middlewares/errorHandler";

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinden çalışıyor.`)
})