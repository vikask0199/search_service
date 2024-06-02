

export interface IStore {
    _id?: string;
    name: string;
    address: {
        city: string;
        state: string;
        zip: string;
    };
    completeAddress: string;
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