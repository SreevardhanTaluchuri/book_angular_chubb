import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICart } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() book! : ICart;
  @Output() updateQuantity : EventEmitter<number> = new EventEmitter<number>();
  constructor(private cartService : CartService){}

  changeQuantity(operation : string){
    this.cartService.changeQuantity(this.book.ISBN , operation);
    try{
      const quantity = this.cartService.getBookFromCart(this.book.ISBN).quantity;
      console.log(quantity , this.book.quantity);
      this.updateQuantity.emit(this.book.quantity);
    }catch(err){
      this.updateQuantity.emit(0);
    }
  }
}
