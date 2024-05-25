import { ICategory } from "../interfaces/CategoryInterface"
import Category from "../models/Category"


export const categoryRepository = {
    createCategory: async (category: ICategory): Promise<ICategory> => {
        return Category.create(category)
    },

    findCategoryByName: async (name: string): Promise<ICategory | null> => {
        return Category.findOne({ name }).exec()
    },

    findCategoryById: async (categoryId: string): Promise<ICategory | null> => {
        return Category.findOne({ _id: categoryId }).exec()
    },

    getAllCategory: async (): Promise<ICategory[] | null> => {
        const allCategory = await Category.find()
        return allCategory;
    },

    deleteCategory: async (categoryId: string): Promise<string> => {
        await Category.deleteOne({ _id: categoryId })
        return "Category deleted successfully"
    },

    updateCategoryPatch: async (categoryId: string, categoryName: string): Promise<ICategory> => {
        const UpdateCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name: categoryName },
            { new: true }
        )
        if(!UpdateCategory){
            throw new Error('Failed to update category')
        }
        return UpdateCategory;
    }

}