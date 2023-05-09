import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  isClicked = false;

  suscription: Subscription;

  constructor(private postService: PostService){}

  ngOnInit(){
    this.suscription = this.postService.getRefresh$.subscribe()
  }

  toggleLike(){
    this.isClicked = !this.isClicked;
  }
}
