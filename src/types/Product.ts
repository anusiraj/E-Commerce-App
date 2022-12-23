import { Category } from "./Category"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: Category 
    images: string[]
}
export interface CreateProduct {
    title: string
    price: number
    description: string
    categoryId: number 
    images: string[]
}