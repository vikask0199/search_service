import { ICategory } from "../interfaces/CategoryInterface";
import { categoryRepository } from "../repositories/categoryRepository";


export const categoryService = {
    createCategory: async (categoyData: ICategory): Promise<ICategory> => {
        const existingCategory = await categoryRepository.findCategoryByName(categoyData.name);
        if (existingCategory) {
            throw new Error('Category already exists');
        }
        return categoryRepository.createCategory(categoyData)
    },

    findCategoryDetails: async (categoryId: string): Promise<ICategory> => {
        const getCategoryDetails = await categoryRepository.findCategoryById(categoryId)
        if (!getCategoryDetails) {
            throw new Error('Category not found')
        }
        return getCategoryDetails;
    },

    getAllCategoryRecords: async():Promise<ICategory[]>=>{
        const getAllCategories = await categoryRepository.getAllCategory()
        if(!getAllCategories){
            throw new Error("No category found")
        }
        return getAllCategories;
    },

    deleteCategories: async(categoryId: string): Promise<string> =>{
        const existingCategory = await categoryRepository.findCategoryById(categoryId);
        if(!existingCategory){
            throw new Error("No category found")
        }
        const deleteCategory = await categoryRepository.deleteCategory(categoryId)
        return deleteCategory;
    },

    updateCategory: async(categoryId: string, categoryName: string): Promise<ICategory> =>{
       const existingCategory = await categoryRepository.findCategoryById(categoryId);
       if(!existingCategory){
        throw new Error("No category found")
       }
       const updateCat = await categoryRepository.updateCategoryPatch(categoryId, categoryName)
       return updateCat;
    }
}