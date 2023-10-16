import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBook } from './book';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit , OnChanges {
  @Input() book! : IBook;
  @Input() product! : {ISBN : number , quantity : number};
  @Output() productToBeUpdatedInCart : EventEmitter<{ISBN : number , quantity : number}> = new EventEmitter<{ISBN : number , quantity : number}>;
  bookFoundInCart : boolean = false;
  quantity : number = 0;
  constructor(private cartService : CartService){}

  ngOnInit(): void {
    const bookFoundInCart = this.cartService.getBookFromCart(this.book.ISBN);
    if(bookFoundInCart) this.quantity =bookFoundInCart.quantity;
    else this.quantity = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.product?.ISBN == this.book.ISBN && this.product?.quantity == 0){
      this.bookFoundInCart = false;
    }else{
      this.quantity = this.book?.ISBN == this.product?.ISBN ? this.product?.quantity : this.quantity;
    }
  }

  addToCart():void{
    this.cartService.addToCart(this.book.ISBN);
    this.bookFoundInCart = true;
    this.quantity = 1;
  }

  
  
  changeQuantity(operation : string){
    this.cartService.changeQuantity(this.book.ISBN , operation);
    try{
      this.quantity = this.cartService.getBookFromCart(this.book.ISBN).quantity;
    }catch(err){
      this.quantity = 0;
      this.productToBeUpdatedInCart.emit({ISBN : this.book.ISBN , quantity : 0});
      this.bookFoundInCart = false;
    }
  }
}
