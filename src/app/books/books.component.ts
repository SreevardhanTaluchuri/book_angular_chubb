import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBook } from './book/book';
import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit , OnChanges{
  books : IBook[] = [];
  filteredBooks : IBook[] = [];
  private _filter : string = '';
  isLoading : boolean = true;
  @Input() productToBeUpdated! : {ISBN : number , quantity : number};
  @Output() updateBooksInCart : EventEmitter<{ISBN : number , quantity : number}> = new EventEmitter<{ISBN : number , quantity : number}>();

  constructor(private booksService : BookService) {}

  get filter() : string{
    return this._filter;
  }

  set filter(filter : string){
    this._filter = filter;
    this.filteredBooks = this.filterBooks();
  }

  filterBooks() : IBook[]{
    return this.books.filter(item => item.title.toLocaleLowerCase().includes(this._filter.toLocaleLowerCase()));
  }

  updateCart(event : {ISBN : number , quantity : number}){
    this.updateBooksInCart.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  getBooks() :void{
    this.booksService.getBooks().subscribe({
      next : books => {
        this.books = books.books;
        this.filteredBooks = books.books;
        this.isLoading = false;
      },
      error : err => console.log(err)
    });
  }
  
  ngOnInit(): void {
    this.getBooks();
  }

}
