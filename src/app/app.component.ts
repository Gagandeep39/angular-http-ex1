import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  fetchedPost;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  // Parameters -> varName: ObjectType/Structure
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http
      .post<{lol: string, ll: string}>('https://fir-contact-c6ceb.firebaseio.com/post.json', postData)
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log('Error: ' + error);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  onFetchPosts() {
    this.http
      .get<{[key: string]: Post}>('https://fir-contact-c6ceb.firebaseio.com/post.json')
      .pipe(
        map((responseData)  => {
          const responseArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              responseArray.push({ ...responseData[key], id: key });
            }
          }
          return responseArray;
        })
      )
      .subscribe(
        responseData => {
          this.fetchedPost = responseData;
          console.log(responseData);
        },
        error => {
          console.log('Error: ' + error);
        },
        () => {
          console.log('Completed');
        }
      );
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
// Append /post.json to store it in a folder named post in firebase
// Http requests wont be sent if we dont subscribe for response
// MAP is an operator to map something to something else
// Here we are iterating through response data
// 1. for every key, we will check if the data has a key
// 2. then we will push the conent mapped with key directly (Multiple key value pairs are pushed together using '...')
// 3. To preseve the keyof, we will add it as an additional key value pair
// {[key: string]: Post}
// Here key is the root value 
// Post object is the nested structure 

// When we specify get<{abc: string}> or .post<{[key: strig]: Post}>
// THe subscriber will intepret the recieved data as the specified object
// basicay <> specifies response body type
