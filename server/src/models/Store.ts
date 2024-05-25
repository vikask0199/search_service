import mongoose, { Schema } from "mongoose";
import { IStore } from "../interfaces/StoreInterfaces";


const storeSchema = new mongoose.Schema<IStore>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            sector: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
        },
        phone: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: false,
        },
        whatsApp: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        rating: {
            type: [Number],
            default: []
        },
        locationUrl: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Store = mongoose.model<IStore>('Store', storeSchema)
export default Store