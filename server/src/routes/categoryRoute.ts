import express from "express"
import { createCategory, deleteCategory, findCategoryByName, getAllCategoryRec, updateCategory } from "../controllers/categoryController"


const router = express.Router()
router.post("/createCategory", createCategory)
router.get("/", findCategoryByName)
router.delete("/", deleteCategory)
router.patch("/", updateCategory)
router.get("/get-all-category", getAllCategoryRec)

export default router