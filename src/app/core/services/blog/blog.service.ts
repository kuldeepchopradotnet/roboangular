import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRoot, Post } from 'src/app/domain/model/post.model';

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
    search: 'search',
    status: 'status',
    statusVal: 'live',
    fetchBodies: 'fetchBodies',
    fetchImages: 'fetchImages',
    isFetchBody: false,
    isFetchImages: true,
    key: 'key',
    bypath: 'bypath',
    path: 'path'
  }

  readonly apiKey = ''
  constructor(private http: HttpClient) { }

  getPost(): Observable<PostRoot>{
    let {base,blog,blogId,posts,status,statusVal,fetchBodies,fetchImages,isFetchBody,isFetchImages,key,apikey} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}?${status}=${statusVal}&${fetchBodies}=${isFetchBody}&${fetchImages}=${isFetchImages}&${key}=${apikey}`; 
    console.log(url);
    return this.http.get<PostRoot>(url);
  }

  getPostByPath(pathurl:string){
    let {base,blog,blogId,posts,apikey,bypath,path,key} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${bypath}?${path}=${pathurl}&${key}=${apikey}`; 
    console.log(url);
    return this.http.get<Post>(url);
  }

  searchPost(query:string){
    let {base,blog,blogId,posts,apikey,search,key} = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${search}?q=${query}&${key}=${apikey}`; 
    console.log(url);
    return this.http.get<PostRoot>(url);
  }

}
