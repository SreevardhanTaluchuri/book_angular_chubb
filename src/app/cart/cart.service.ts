import { Injectable } from '@angular/core';
import { ICart } from './cart';
import { IBook } from '../books/book/book';
import { BookService } from '../books/book.service';
import { CartComponent } from './cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart : ICart[] = [];
  total : number = 0;
  constructor(private bookService : BookService) { }

  get cart() : ICart[]{
    return this._cart;
  }

  set cart(book : IBook){
    this._cart.push({...book , quantity : 1});
  }

  addToCart(ISBN : number) : void{
    const book = this.bookService.getBook(ISBN);
    this.cart = book;
    this.getTotalPrice();
  }

  getBookFromCart(ISBN : number) : ICart{
    return this._cart.filter(item => item.ISBN === ISBN)[0];
  }

  getTotalPrice() : void{
    const total = this.cart.map(item => parseFloat(item.price.displayValue) * item.quantity);
    this.total =  total.reduce((partialSum, a) => partialSum + a, 0);
  }

  changeQuantity(ISBN : number , operation : string) : void{
    this.cart.forEach(item => {
      if(item.ISBN === ISBN){
        if(operation == '+') item.quantity = item.quantity + 1;
        else{
          if(item.quantity == 1){
            this._cart = this.cart.filter(item => item.ISBN != ISBN);
          }else{
            item.quantity = item.quantity -1;
          }
        }
      }
    })
    this.getTotalPrice();
  }
}
