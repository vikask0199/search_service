import { NextFunction, Request, Response } from "express";
import { validateToken } from "./jwtMiddleWare";
import { sendResponse } from "../utils/sendResponse";

export const checkAuthorizeOrNot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestHeader = req.headers.authorization
        let token = null;
        if (requestHeader && requestHeader.startsWith("Bearer")) {
            token = requestHeader.split(" ")[1]
            const decodeTokenData = await validateToken(token)
            if (decodeTokenData) {
                next()
            } else {
                throw new Error("Something wrong with login token")
            }
        } else {
            throw new Error("Please login")
        }
    } catch (error: any) {
        sendResponse(res, 501, error.message)
    }
}