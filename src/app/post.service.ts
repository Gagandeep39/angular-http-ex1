import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // When ever an error occurs, it will execute next
  errorSubject = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    console.log(postData);
    this.http
      .post<{ lol: string; ll: string }>(
        'https://fir-contact-c6ceb.firebaseio.com/post.json',
        postData
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.errorSubject.next(error.value);
          console.log('Error: ' + error);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  fetchPost() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://fir-contact-c6ceb.firebaseio.com/post.json',
        {
          headers: new HttpHeaders({'Custom-header': 'I Luv You'})
        }
      )
      .pipe(
        map(responseData => {
          const responseArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              responseArray.push({ ...responseData[key], id: key });
            }
          }
          return responseArray;
        }),
        catchError(errorResponse => {
          console.log('Error in in Pipe Section');
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http.delete('https://fir-contact-c6ceb.firebaseio.com/post.json');
  }
}
