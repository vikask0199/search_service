

export interface IStore {
    _id?: string;
    name: string;
    address: {
        sector: string;
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    phone: string;
    email: string;
    website?: string;
    whatsApp: string;
    logo: string;
    rating?: []
    locationUrl?: string;
    category: string | any;
    createdAt?: Date;
    updatedAt?: Date;
}