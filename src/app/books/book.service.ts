import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IBook } from './book/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url : string = "https://private-anon-fe47945980-bookstore.apiary-mock.com/books";
  books : IBook[] = [];
  constructor(private http : HttpClient) { }
  getBooks() : Observable<{books : IBook[] , links : any[]}>{
    return this.http.get<{books : IBook[] , links : any[]}>(this.url).pipe(
      tap(books => this.books = books.books),
      catchError(this.handleError)
    )
  }

  private handleError(err : HttpErrorResponse){
    let error = '';
    if(err.error instanceof ErrorEvent){error = `An error occured in ${err.error.message}`}
    else{error = `Server returned with error ${err.status} and ${err.message}`}
    console.log(error);
    return throwError(() => error);
  }

  getBook(ISBN : number) : IBook {
    return this.books.filter(item => item.ISBN === ISBN)[0];
  }
}
