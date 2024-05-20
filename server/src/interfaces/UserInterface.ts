

export interface IUser {
    id?: string;
    email: string;
    password: string;
    name?: string;
}


export interface AuthServiceRespo {
    token?: string;
    user?: IUser;
    message: string
} 