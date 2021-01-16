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

  getPost(nextPageToken?: string, limit?: number): Observable<PostRoot> {
    let { base, blog, blogId, posts, status, statusVal, fetchBodies, fetchImages, isFetchBody, isFetchImages, key, apikey, maxResults, pageToken } = this.blogUrls;
    let url: string;
    if (nextPageToken) {
      url = `${base}${blog}/${blogId}/${posts}?${status}=${statusVal}&${maxResults}=${limit}&${pageToken}=${nextPageToken}&${fetchBodies}=${isFetchBody}&${fetchImages}=${isFetchImages}&${key}=${apikey}`;
    }
    else {
      url = `${base}${blog}/${blogId}/${posts}?${status}=${statusVal}&${maxResults}=${limit}&${fetchBodies}=${isFetchBody}&${fetchImages}=${isFetchImages}&${key}=${apikey}`;
    }
    console.log(url);
    return this.http.get<PostRoot>(url);
  }

  getPostByPath(pathurl: string) {
    let { base, blog, blogId, posts, apikey, bypath, path, key } = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${bypath}?${path}=${pathurl}&${key}=${apikey}`;
    return this.http.get<Post>(url);
  }

  searchPost(query: string) {
    let { base, blog, blogId, posts, apikey, search, key, fetchBodies } = this.blogUrls;
    let url = `${base}${blog}/${blogId}/${posts}/${search}?q=${query}&${fetchBodies}=${false}&${key}=${apikey}`;
    return this.http.get<PostRoot>(url);
  }

  getPages() {
    const { base, blog, blogId, apikey, key, fetchBodies, statusVal, status } = this.blogUrls;
    let url = `${base}${blog}/${blogId}/pages?${status}=${statusVal}&${fetchBodies}=false&${key}=${apikey}`
    return this.http.get<PostRoot>(url);
  }

  getPageById(id: string) {
    const { base, blog, blogId, apikey, key, fetchBodies, statusVal, status } = this.blogUrls;
    let url = `${base}${blog}/${blogId}/pages/${id}?${status}=${statusVal}&${key}=${apikey}`
    return this.http.get<PostRoot>(url);
  }

}
