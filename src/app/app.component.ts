import { Component, OnInit } from '@angular/core';
import { IBook } from './books/book/book';
import { BookService } from './books/book.service';
import { ICart } from './cart/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'products';
  books : IBook[] = [];
  removeBookInCart! : {ISBN : number , quantity : number};
  productToBeUpdated! : {ISBN : number , quantity : number};
  constructor(private booksService : BookService) {}

  updateQuantity(event : {ISBN : number , quantity : number}){
    this.productToBeUpdated = event;
  }

  updateBooksInCart(ISBN : {ISBN : number , quantity : number}) : void{
    this.removeBookInCart = ISBN;
  }
}
