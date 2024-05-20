import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { sendResponse } from '../utils/sendResponse';
import { IUser } from '../interfaces/UserInterface';


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
        sendResponse(res, 200, response.message, { token: response.token});
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
};
