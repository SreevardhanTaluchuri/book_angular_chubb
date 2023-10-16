import { Component, EventEmitter, Input, OnChanges, OnInit , Output, SimpleChanges} from '@angular/core';
import { ICart } from './cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges{
  cart : ICart[] = [];
  @Input() ISBN! : {ISBN : number , quantity : number};
  @Output() changeQuantity: EventEmitter<{ISBN : number , quantity : number}> = new EventEmitter<{ISBN : number , quantity : number}>();
  constructor(public cartService : CartService){}

  emitQuantity(quantity : number , ISBN : number){
    if(quantity == 0){
      this.cart = this.cartService.cart;
      console.log(this.cart);
    }else{
    }
    this.changeQuantity.emit({ISBN , quantity});
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.cartService.cart.filter(item => item.ISBN == this.ISBN.ISBN)[0]);
    if(!this.cartService.cart.filter(item => item.ISBN == this.ISBN.ISBN)[0]){
      this.cart = this.cartService.cart;
    }
  }
}
