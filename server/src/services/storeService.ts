import { IStore } from "../interfaces/StoreInterfaces";
import { storeRepository } from "../repositories/storeRepository";



export const storeService = {
    createStore: async (storeData: IStore): Promise<IStore> => {
        const isExitStore = await storeRepository.getStoreByEmail(storeData.email)
        if (isExitStore) {
            throw new Error("Store already present")
        }
        return storeRepository.createStore(storeData)
    },


    getStoreByCategoryAndLocation: async (category: string, city: string, page: number = 1, limit: number = 10): Promise<any> => {
        const skip = (page - 1) * limit;
        const [stores, totalRecords] = await Promise.all([
            storeRepository.getStoresByCategoryAndLocation(category, city, skip, limit),
            storeRepository.countStoresByCategoryAndLocation(category, city)
        ])
        const totalPages = Math.ceil(totalRecords / limit)
        return { stores, totalRecords, totalPages, currentPage: page }
    },

    getAllStores: async (page: number = 1, limit: number = 10): Promise<any> => {
        const skip = (page - 1) * limit;
        const [stores, totalRecords] = await Promise.all([
            storeRepository.getAllStore(skip, limit),
            storeRepository.countAllStores()
        ])
        const totalPages = Math.ceil(totalRecords / limit)
        return { stores, totalRecords, totalPages, currentPage: page }
    },

    getStoreByEmailId: async (email: string): Promise<IStore | null> => {
        const isExitStore = await storeRepository.getStoreByEmail(email)
        if (!isExitStore) {
            throw new Error("Store not found")
        }
        return storeRepository.getStoreByEmailId(email)
    },

    updateStoreByEmailId: async (email: string, updateData: Partial<IStore>): Promise<IStore | null> => {
        const isExitStore = await storeRepository.getStoreByEmail(email)
        if (!isExitStore) {
            throw new Error("Store not found")
        }
        return storeRepository.updateStoreByEmailId(email, updateData)
    },

    deleteStoreByEmailId: async (email: string): Promise<IStore | null> => {
        const isExitStore = await storeRepository.getStoreByEmail(email)
        if (!isExitStore) {
            throw new Error("Store not found")
        }
        return storeRepository.deleteStoreByEmailId(email)
    }
}