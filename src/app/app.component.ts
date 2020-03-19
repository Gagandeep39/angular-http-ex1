import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // Parameters -> varName: ObjectType/Structure
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http
      .post(
        'https://fir-contact-c6ceb.firebaseio.com/post.json',
        postData
      )
      .subscribe(responseData => {
        console.log('Response: ' + responseData);
      }, (error) => {
        console.log('Error: ' + error);
      }, () => {
        console.log('Completed');
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
// Append /post.json to store it in a folder named post in firebase 
// Http requests wont be sent if we dont subscribe for response 