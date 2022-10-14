import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movie {
  title: string;
  director: string;
  year: number;
}

export interface Problem {
  code: number;
  reason: string;
  timestamp: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieBackendService {

  /*
  * Prima url impostato come '/movies' e dava come errore
  * invalid token
  * Con url localhost:9000/movies da 403, problemi di Cors
  * */

  //private readonly backendUrl = 'http://localhost:9000/movies'
    private readonly backendUrl = '/movies'
  // private readonly backendUrl = '/api';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.backendUrl, {headers: new HttpHeaders().append('Access-Control-Allow-Origin','*')});
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.backendUrl + '/' + id);
  }
}
