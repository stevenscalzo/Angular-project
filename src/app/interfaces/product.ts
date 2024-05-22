import { Web } from "./web";

export interface Product {
    _id: string;
    title: string;
    description: string;
    category: number;
    price: number;
    imageUrl: string;
    webUrl: string;
    rating: number;
    web: Web;
    qty: number;
}
