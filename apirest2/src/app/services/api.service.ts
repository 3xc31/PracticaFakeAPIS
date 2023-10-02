import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from
  '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + '/posts/').pipe(
      retry(3)
    );
  }

  getPost(userId:any): Observable<any> {
    return this.http.get(this.apiURL + '/posts/' + userId).pipe(
      retry(3)
    );
  }

  createPost(post:any): Observable<any> {
    return this.http.post(this.apiURL + '/posts', post, this.httpOptions).pipe(
      retry(3)
    );
  }

  updatePost(id:any, post:any): Observable<any> {
    return this.http.put(this.apiURL + '/posts/' + id, post, this.httpOptions).pipe(
      retry(3)
    );
  }

  deletePost(id:any):Observable<any>{
    return this.http.delete(this.apiURL+'/posts/'+id,this.httpOptions);
  }

  getUsuario(): Observable<any> {
    return this.http.get(this.apiURL+"/users/").pipe(
      retry(3)
    );
  }
   
}
