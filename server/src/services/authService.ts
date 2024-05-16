import { jwtSecret } from "../config/dbConfig";
import { AuthServiceRespo, IUser } from "../interfaces/UserInterface";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

    login: async (email: string, password: string): Promise<AuthServiceRespo> => {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new Error("Invalid Email")
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            throw new Error("Invalid password")
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: "1h"
        })
        return { message: "Login Successful", token, user }
    }
}