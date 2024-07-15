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

import connectMongoDb from "./config/mongoDb";

connectMongoDb();


import cors from "cors";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


import userServiceRoutes from "./routes/mainRoutes";

app.use("/api",userServiceRoutes)

import errorHandler from "./middlewares/errorHandler";

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinden çalışıyor.`)
})