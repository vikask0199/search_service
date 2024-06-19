import { Request, Response } from "express";
import mongoose from "mongoose";
import { IStore } from "../interfaces/StoreInterfaces";
import { categoryService } from "../services/categoryService";
import { storeService } from "../services/storeService";
import { sendResponse } from "../utils/sendResponse";
import Store from "../models/Store";


export const createStore = async (
    req: Request<{}, {}, IStore>,
    res: Response
): Promise<void> => {
    try {
        const storeData = req.body
        const category = req?.body?.category
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return sendResponse(res, 400, 'Invalid category');
        }
        const categoryDetails = await categoryService.findCategoryDetails(category)
        if (!categoryDetails) {
            return sendResponse(res, 400, 'Please enter a valid category id');
        }
        const store = await storeService.createStore(storeData)
        res.status(201).json({ status: "success", STATUS_CODES: 201, data: store })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}

export const getStoresByCategoryAndLocation = async (
    req: Request<{}, {}, {}, { category: string; city: string; page?: number }>,
    res: Response
): Promise<void> => {
    try {
        const { category, city, page } = req.query;
        const pageNumber = page ? Number(page) : 1;

        if (!mongoose.Types.ObjectId.isValid(category)) {
            throw new Error('Invalid category ID');
        }

        const stores = await storeService.getStoreByCategoryAndLocation(category, city, pageNumber);
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: stores });
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}

export const getAllStores = async (
    req: Request<{}, {}, {}, { page?: number }>,
    res: Response
): Promise<void> => {
    try {
        const { page } = req.query;
        const pageNumber = page ? Number(page) : 1;
        const stores = await storeService.getAllStores(pageNumber)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: stores })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}

export const getStoreByEmailId = async (
    req: Request<{ email: string }, {}, {}, {}>,
    res: Response
): Promise<void> => {
    try {
        const { email } = req.params
        const storeDetails = await storeService.getStoreByEmailId(email)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: storeDetails })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}


export const updateStoreByEmailId = async (
    req: Request<{ email: string }, {}, Partial<IStore>, {}>,
    res: Response
): Promise<void> => {
    try {
        const { email } = req.params
        const updateData = req.body
        const store = await storeService.updateStoreByEmailId(email, updateData)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: store, message: "Store updated successfully" })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}

export const deleteStoreByEmailId = async (
    req: Request<{ email: string }, {}, {}, {}>,
    res: Response
): Promise<void> => {
    try {
        const { email } = req.params
        const deletedRecords = await storeService.deleteStoreByEmailId(email)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: deletedRecords, message: "Store deleted successfully" })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}


export const getStreamData = async (req: Request, res: Response): Promise<void> => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const sendData = (data: IStore) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        // Send initial data one by one
        const initialStores = await storeService.streamStoreService();
        for (const store of initialStores) {
            sendData(store);
        }

        // Set up change stream for new data
        const changeStream = mongoose.connection.collection('stores').watch();

        changeStream.on('change', (change) => {
            if (change.operationType === 'insert') {
                const newStore = change.fullDocument as IStore;
                sendData(newStore);
            }
        });

        req.on('close', () => {
            console.log('Client connection closed.');
            changeStream.close();
            res.end();
        });

        console.log('Stream connection established.');
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const totalStoreCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalRecords = await Store.countDocuments();
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: totalRecords })
    } catch (error: any) {
        sendResponse(res, 400, error.message);
    }
}