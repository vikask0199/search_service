import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/UserInterface'


const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
)


export const User = model<IUser>('User', userSchema)