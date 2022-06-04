import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { handleError } from '../errors/global-error-handler';
import { Cocktail } from '../models/cocktail';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  getCocktails(): Observable<Cocktail[]>{
    return this.http.get<Cocktail[]>(`${environment.apiUrl}/cocktails`)
    .pipe(catchError(handleError));
  }

  getCocktail(cocktailId: number): Observable<Cocktail>{
    return this.http.get<Cocktail>(`${environment.apiUrl}/cocktails/${cocktailId.toString()}`)
    .pipe(catchError(handleError));
  }

  addCocktail(cocktail: Cocktail):Observable<Cocktail>{
    return this.http.post<Cocktail>(`${environment.apiUrl}/cocktails`, cocktail)
    .pipe(catchError(handleError));
  }

  editCocktail(cocktail: Cocktail):Observable<Cocktail>{
    return this.http.put<Cocktail>(`${environment.apiUrl}/cocktails/${cocktail.cocktailId}`, cocktail)
    .pipe(catchError(handleError));
  }

  deleteCocktail(cocktailId: number):Observable<Cocktail>{
    return this.http.delete<Cocktail>(`${environment.apiUrl}/cocktails/${cocktailId.toString()}`)
    .pipe(catchError(handleError));
  }

  setMenu(cocktails: Cocktail[]){
    return this.http.put<Cocktail[]>(`${environment.apiUrl}/cocktails/setMenu`, cocktails)
    .pipe(catchError(handleError));
  }

  getMenu():Observable<Cocktail[]>{
    return this.http.get<Cocktail[]>(`${environment.apiUrl}/cocktails/getMenu`)
    .pipe(catchError(handleError));
  }
}
