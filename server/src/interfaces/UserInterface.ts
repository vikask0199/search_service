

export interface IUser {
    id?: string;
    email: string;
    password: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface AuthServiceRespo {
    token?: string;
    user?: IUser;
    message: string
} 