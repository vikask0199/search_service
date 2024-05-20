import mongoose from 'mongoose'
import { IUser } from '../interfaces/UserInterface'


const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
)

const User = mongoose.model<IUser>('User', userSchema);

export default User