export interface IBook{
    ISBN: number,
    title: string,
    author: string,
    summary:string,  
    image: string,
    price: IBookPrice
}

export interface IBookPrice{
    currency: string,
    value: number,
    displayValue: string,
}