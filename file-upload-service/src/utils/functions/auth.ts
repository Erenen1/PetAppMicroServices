import jwt from "jsonwebtoken"

export const verifyJwtToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string);