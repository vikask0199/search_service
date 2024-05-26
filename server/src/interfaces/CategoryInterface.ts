
export interface ICategory {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ICategoryParams{
    categoryId: string
}

export interface QueryParams {
    category: string;
    city: string;
    page?: string;
}