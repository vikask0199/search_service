import express from "express"
import { createCategory, deleteCategory, findCategoryByName, getAllCategoryRec, updateCategory } from "../controllers/categoryController"
import { checkAuthorizeOrNot } from "../middlewares/checkAuthorizeOrNot"


const router = express.Router()

router.post("/createCategory",checkAuthorizeOrNot, createCategory)
router.get("/get-all-category", getAllCategoryRec)
router.get("/:categoryId", checkAuthorizeOrNot, findCategoryByName)
router.delete("/:categoryId", checkAuthorizeOrNot, deleteCategory)
router.patch("/:categoryId", checkAuthorizeOrNot, updateCategory)

export default router