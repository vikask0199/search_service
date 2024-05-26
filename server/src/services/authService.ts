import bcrypt from 'bcrypt';
import { AuthServiceRespo, IUser } from "../interfaces/UserInterface";
import { authMiddleware } from '../middlewares/jwtMiddleWare';
import { userRepository } from "../repositories/userRepository";


export const authService = {
    signup: async (userData: IUser): Promise<AuthServiceRespo> => {
        const existingUser = await userRepository.findByEmail(userData.email)
        if (existingUser) {
            throw new Error('Email Already in use')
        }

        const hashedPassword = await bcrypt.hash(userData.password, 12)
        const user = await userRepository.createUser({ ...userData, password: hashedPassword })
        return { message: "User created Successfully", user }
    },

    login: async (email: string, password: string): Promise<string | null> => {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new Error("Invalid Email")
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            throw new Error("Invalid password")
        }

        const token = await authMiddleware({ email, password })
        return token;
    }
}