import { Request, Response } from 'express';
import { IUser } from '../interfaces/UserInterface';
import { authService } from '../services/authService';
import { sendResponse } from '../utils/sendResponse';


export const signup = async (
    req: Request<{}, {}, IUser>,
    res: Response
): Promise<void> => {
    try {
        const response = await authService.signup(req.body);
        sendResponse(res, 201, response.message);
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
};

export const login = async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const response = await authService.login(email, password);
        res.status(200).json({ status: "success", message: "This is your JWT token", STATUS_CODES: 200, token: response })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
};
