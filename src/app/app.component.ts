import { PostService } from './post.service';
import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { load } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // To store the rrecieved srray
  fetchedPost: Post[] = [];

  // TOvshow an indicator
  isFetching = true;

  error = null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  // Parameters -> varName: ObjectType/Structure
  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createAndStorePost(postData);
    // Send Http request
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      responseData => {
        console.log(responseData);
        this.fetchedPost = responseData;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
      () => {
        this.isFetching = false;
        console.log('Completed');
      }
    );
    // Send Http request
  }
  onClearPosts() {
    this.postService.deletePosts().subscribe(result => {
      this.onFetchPosts();
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
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

// Data fetched using http is async
// These data can be obtained in comoonent using subject subscription
// Howver we will have t create different obervable for different operation
// Instead we will prepare data i servie, followed by subscribing in component
