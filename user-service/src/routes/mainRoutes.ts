import profileRoutes from "./profileRoutes"
import authRoutes from "./authRoutes"
import express from "express";
import { authRateLimiter } from "../middlewares/rateLimiter";
import isAuth from "../middlewares/isAuth";

const app = express();


app.use("/users/profile", isAuth, profileRoutes);
app.use("/auth", authRateLimiter, authRoutes);


export default app;