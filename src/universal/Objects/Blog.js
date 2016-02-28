import User from './User';

export default class {
  id: string;
  title: string;
  content: string;
  author: User;
  created: number;
  updated: number;

  constructor(title, content, image, author, created, updated) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.author = author;
    this.created = created;
    this.updated = updated;
  }

  imageURL() {
    return `/assets/images/blogs/${this.id}`;
  }
}
