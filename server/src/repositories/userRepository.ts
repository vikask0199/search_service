import { IUser } from "../interfaces/UserInterface";
import  User  from "../models/User"

export const userRepository = {
    findByEmail: async (email: string): Promise<IUser | null> => {
        return User.findOne({ email }).exec()
    },

    createUser: async (user: IUser): Promise<IUser> => {
        return User.create(user)
    }
}