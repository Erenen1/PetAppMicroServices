import express from "express"
// import logger from "../helpers/logger"
import CustomError from "../utils/classes/CustomError";
import Response from "../utils/classes/Response";


export default (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // logger.error(error.message);

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(Response.errorResponse(error));
    }
    else if (error.name == "ValidationError") {
        return res.status(400).json("Bad request");
    }
    else {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}