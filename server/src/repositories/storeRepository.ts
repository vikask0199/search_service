import { IStore } from "../interfaces/StoreInterfaces";
import Store from "../models/Store";



export const storeRepository = {
    createStore: async (store: IStore): Promise<IStore> => {
        return Store.create(store)
    },

    getStoresByCategoryAndLocation: async (category: string, city: String, skip: number, limit: number): Promise<IStore[]> => {
        return Store.find({
            category,
            'address.city': city
        })
            .skip(skip)
            .limit(limit)
            .populate('category')
            .exec();
    },

    countStoresByCategoryAndLocation: async (category: string, city: string): Promise<number> => {
        return Store.countDocuments({ category, 'address.city': city }).exec();
    },

    getAllStore: async (skip: number, limit: number): Promise<IStore[]> => {
        return Store.find()
            .skip(skip)
            .limit(limit)
            .populate('category')
            .exec();
    },

    countAllStores: async (): Promise<number> => {
        return Store.countDocuments().exec();
    },

    getStoreByEmail: async (email: String): Promise<IStore | null> => {
        return Store.findOne({ email }).exec();
    },

    getStoreByEmailId: async (email: string): Promise<IStore | null> => {
        return Store.findOne({email}).populate('category').exec();
    },

    updateStoreByEmailId: async (email: string, updateData: Partial<IStore>): Promise<IStore | null> => {
        const updatedRecords = await Store.findOneAndUpdate({email}, updateData, { new: true }).populate('category')
        return updatedRecords;
    },

    deleteStoreByEmailId: async (email: string): Promise<IStore | null> => {
        const deletedRecord = Store.findOneAndDelete({email}).exec()
        return deletedRecord;
    }
}