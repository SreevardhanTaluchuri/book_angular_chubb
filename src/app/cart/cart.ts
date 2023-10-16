import { IBookPrice } from "../books/book/book";

export interface ICart{
    ISBN: number,
    title: string,
    author: string,
    summary: string,
    image: string,
    price: IBookPrice,
    quantity : number,
}