import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  users: any;

  posts: any;
  post: any = {
    id: null,
    title: "",
    body: "",
    userId: null
  };

  compareWith: any;

  constructor(private api: ApiService) {
    this.api.getPosts().subscribe((res) => {
      console.log(res[0]);
    }, (error) => {
      console.log(error);
    });
  }

  obtenerUsuarios() {
    this.api.getUsuario().subscribe((data) => {
      this.users = data;
    })
  }

  obtenerPosts() {
    this.api.getPosts().subscribe((data) => {
      this.posts = data;
    })
  }

  ionViewWillEnter() {
    this.obtenerUsuarios();
    this.obtenerPosts();
  }

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  eliminarPost(id: any) {
    this.api.deletePost(id).subscribe((success) => {
      console.log(success);
      this.obtenerPosts();
    }, error => {
      console.log(error);
    })
  }

  guardarPost(title: any, body: any) {
    var post = {
      title: title,
      body: body,
      userId: this.user
    }
    this.api.createPost(post).subscribe((success) => {
      console.log(success);
      this.obtenerPosts();
    }, error => {
      console.log(error);
    })
  }

  setPost(id: any) {
    this.api.getPost(id).subscribe((success) => {
      console.log(success);
      this.post.title = success.title;
      this.post.body = success.body;
    }, error => {
      console.log(error);
    })
  }
}
