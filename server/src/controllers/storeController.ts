import { Request, Response } from "express";
import { IStore } from "../interfaces/StoreInterfaces";
import { storeService } from "../services/storeService";
import { sendResponse } from "../utils/sendResponse";
import mongoose from "mongoose";
import { categoryService } from "../services/categoryService";


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
        if(!categoryDetails){
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