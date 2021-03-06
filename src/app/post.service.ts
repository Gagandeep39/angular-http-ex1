import { Post } from './post.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
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
      .post<{ name: string; content: string }>(
        'https://fir-contact-c6ceb.firebaseio.com/post.json',
        postData,
        {
          observe: 'response'
        }
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
    // To add multiple arameter
    const customParams = new HttpParams();
    customParams.append('param1', 'value1');
    customParams.append('param2', 'value2');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://fir-contact-c6ceb.firebaseio.com/post.json',
        {
          headers: new HttpHeaders({ 'Custom-header': 'I Luv You' }),
          // Same as appending '?print=value' to the URL
          // params: new HttpParams().set('print', 'value')
          params: customParams,
          // responseType: 'text' // Will cause an error as data object.data will give an eror
          responseType: 'json' // Json is the default type and will be required 99% of the time
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
    return this.http
      .delete('https://fir-contact-c6ceb.firebaseio.com/post.json', {
        observe: 'events', // On commenting this, the delte wont recieve event data
        responseType: 'json' // a replcaement to get<{respone_type}>('url)
      })
      .pipe(
        tap(event => {
          console.log('Event in delete post: ');
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log('data sent');
          }
        })
      );
  }
}

// By defualt Http returns us only a part of the response
// To get complete Response, we can Enter
// observe: 'response' as a paramater inside get() or post()
