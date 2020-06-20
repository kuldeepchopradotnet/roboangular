export interface Blog {
    id: string;
}

export interface Author {
    id: string;
    displayName: string;
    url: string;
    image: AuthorImg;
}

export interface AuthorImg {
    url: string
}


export interface Reply {
    totalItems: string;
    selfLink: string
}

export interface Post {
    kind: string;
    id: string;
    blog: Blog;
    published: string;
    updated: string;
    url: string;
    selfLink: string;
    title: string;
    content: string;
    author: Author;
    replies: Reply[];
    labels: string[];
    etag: string
}


export interface PostRoot {
    kind: string;
    items: Post[];
    etag: string;
}