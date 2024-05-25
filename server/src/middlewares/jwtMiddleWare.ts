import jwt from "jsonwebtoken"

interface AuthMiddlewareParams {
    email: string;
    id: string;
}

// generate jwt token
export const authMiddleware = async (params: AuthMiddlewareParams) => {
    const { email, id } = params;
    try {
        if (email && id) {
            const token = jwt.sign({ email, id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.TOKEN_EXPIRY_IN })
            return token;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}




// Validate jwt token
export const validateToken = async (token: any) => {
    try {
        const decodedToken: any = jwt.decode(token);
        const isTokenExpired = isTokenExpire(decodedToken.exp);
        if (isTokenExpired) {
            return null;
        } else {
            return decodedToken;
        }
    } catch (error) {
        return null;
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