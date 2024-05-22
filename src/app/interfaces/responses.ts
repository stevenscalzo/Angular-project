import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";
import { User } from "./user";
import { Web } from "./web";

export interface TokenResponse {
    token: string;
}

export interface UserResponse {
    user: User;
}

export interface UsersResponse {
    users: User[];
}

export interface WebsResponse {
    webs: Web[];
}

export interface WebResponse {
    web: Web;
}

export interface CategoriesResponse {
    categories: Category[];
}

export interface CategoryResponse {
    category: Category;
}

export interface ProductsResponse {
    products: Product[];
}

export interface ProductResponse {
    product: Product;
}

export interface AvatarResponse {
    avatar: string;
}

export interface LikeResponse {
    totalLikes: number;
}

export interface OrdersResponse {
    orders: Order[];
}

export interface CartResponse {
    cart: Order;
}

export interface ErrorResponse {
    error: string;
    statusCode: number | null;
    status: number | null;
    message: string[];
}