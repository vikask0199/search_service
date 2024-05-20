import { Response } from 'express';

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string ,
    data: any = null
): void => {
    res.status(statusCode).json({ message, ...data });
};