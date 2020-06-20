import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRoot } from 'src/app/domain/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrls = {
    base: 'https://www.googleapis.com/blogger/v3/',
    blog: 'blogs',
    blogId: '4489368836732156761',
    posts : 'posts',
    apikey: 'AIzaSyBaYgrLt6mRIYL2N5pAXWGTBx5-tT8LF30',
    search: 'search'
  }

  readonly apiKey = ''
  constructor(private http: HttpClient) { }

  getPost(): Observable<PostRoot>{
    let {base,blog,blogId,posts,apikey} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}?key=${apikey}`; 
    return this.http.get<PostRoot>(url);
  }

  getPostByPath(path:string){
    let {base,blog,blogId,posts,apikey,search} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${search}?q=${path}&key=${apikey}`; 
    return this.http.get<PostRoot>(url);
  }



}
