import jwt from "jsonwebtoken";
import { IJwtMiddleWare } from "../interfaces/JwtMiddleware";

const secretKey = "idontknowsearchserviceowerndetails";

// generate jwt token
export const authMiddleware = async (userDetails: IJwtMiddleWare): Promise<string | null> => {
    const { email, password } = userDetails;
    try {
        const token = jwt.sign({ email }, secretKey , { expiresIn: '1h' })
        return token;
    } catch (error) {
        throw new Error('Something went wrong');
    }
}




// Validate jwt token
export const validateToken = async (token: string): Promise<boolean> => {
    const decodedToken: any = jwt.verify(token, secretKey);
    const isTokenExpired = isTokenExpire(decodedToken.exp);
    if (isTokenExpired) {
        return false;
    } else {
        return true;
    }
};


// Function to check if the token has expired
const isTokenExpire = (exp: number): boolean => {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (exp <= currentTimestamp) {
        return true;
    } else {
        return false;
    }
};