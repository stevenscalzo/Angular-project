export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    phone?: string;
    address?: Address;
}

export interface Address {
    country: string;
    city: string;
    state: string;
    address: string;
    postalCode: string;
}