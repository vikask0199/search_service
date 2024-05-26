import { Request, Response } from "express";
import mongoose from "mongoose";
import { ICategory, ICategoryParams } from "../interfaces/CategoryInterface";
import { categoryService } from "../services/categoryService";
import { sendResponse } from "../utils/sendResponse";



export const createCategory = async (
    req: Request<{}, {}, ICategory>,
    res: Response
): Promise<void> => {
    try {
        const categoyData = req.body
        const category = await categoryService.createCategory(categoyData)
        res.status(201).json({ status: "Success", STATUS_CODES: 201, data: category, message: 'Category created successfully' })
    } catch (error: any) {
        sendResponse(res, 400, error.message)
    }
}


export const findCategoryByName = async (req: Request<{ categoryId: string }, {}, {}>, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendResponse(res, 400, 'Invalid categoryId format');
        }
        const categoryDetails = await categoryService.findCategoryDetails(categoryId)
        res.status(200).json({ status: "Success", STATUS_CODES: 200, data: categoryDetails })
    } catch (error: any) {
        sendResponse(res, 400, error.message)
    }
}

export const getAllCategoryRec = async (req: Request<{}, {}, {}>, res: Response): Promise<void> => {
    try {
        const getAllCategories = await categoryService.getAllCategoryRecords()
        if (getAllCategories.length === 0) {
            return sendResponse(res, 400, 'No categories found')
        } else {
            res.status(200).json({ status: 'Success', STATUS_CODES: 200, data: getAllCategories })
        }
    } catch (error: any) {
        sendResponse(res, 400, error.message)
    }
}



export const deleteCategory = async (req: Request<{ categoryId: string }, {}, {}>, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendResponse(res, 400, 'Invalid category ID');
        }
        const deletedCategory = await categoryService.deleteCategories(categoryId)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: deletedCategory })
    } catch (error: any) {
        sendResponse(res, 400, error.message)
    }
}


export const updateCategory = async (req: Request<{categoryId: string}, {}, { name: string }>, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params
        const categoryName = req.body.name
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendResponse(res, 400, 'Invalid category ID');
        }

        const updatedData = await categoryService.updateCategory(categoryId, categoryName)
        res.status(200).json({ status: "success", STATUS_CODES: 200, data: updatedData })

    } catch (error: any) {
        sendResponse(res, 400, error.message)
    }
}

