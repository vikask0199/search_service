import express from "express"
import { createCategory, deleteCategory, findCategoryByName, getAllCategoryRec, totalCategoryCount, updateCategory } from "../controllers/categoryController"
import { checkAuthorizeOrNot } from "../middlewares/checkAuthorizeOrNot"


const router = express.Router()

router.post("/createCategory",checkAuthorizeOrNot, createCategory)
router.get("/get-all-category", getAllCategoryRec)
router.get("/getAllCategoryCount", checkAuthorizeOrNot, totalCategoryCount)
router.get("/:categoryId", checkAuthorizeOrNot, findCategoryByName)
router.delete("/:categoryId", checkAuthorizeOrNot, deleteCategory)
router.patch("/:categoryId", checkAuthorizeOrNot, updateCategory)

export default router