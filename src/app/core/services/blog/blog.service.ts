import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { blogUrls } from '../../shared/api.config';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrls: any = blogUrls;

  readonly apiKey = ''
  constructor(private http: HttpClient) { }

  getPost(): Observable<PostRoot>{
    let {base,blog,blogId,posts,status,statusVal,fetchBodies,fetchImages,isFetchBody,isFetchImages,key,apikey} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}?${status}=${statusVal}&${fetchBodies}=${isFetchBody}&${fetchImages}=${isFetchImages}&${key}=${apikey}`; 
    return this.http.get<PostRoot>(url);
  }

  getPostByPath(pathurl:string){
    let {base,blog,blogId,posts,apikey,bypath,path,key} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${bypath}?${path}=${pathurl}&${key}=${apikey}`;
    return this.http.get<Post>(url);
  }

  searchPost(query:string){
    let {base,blog,blogId,posts,apikey,search,key} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${search}?q=${query}&${key}=${apikey}`; 
    return this.http.get<PostRoot>(url);
  }

}
