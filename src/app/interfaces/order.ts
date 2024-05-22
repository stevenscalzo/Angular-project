import { Product as ProductData } from "./product";

export interface Order {
    _id?: string;
    userId: string;
    products: Products[],
    total: number,
    createdAt: Date,
    paid: boolean,
    paidAt?: Date
}

export interface Products {
    _id?: string;
    productId: ProductData;
    price: number;
    qty: number;
}