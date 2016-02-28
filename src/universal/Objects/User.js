
export default class {
  id: string;
  firstname: string;
  lastname: string;
  created: number;

  constructor(title, content, image, author, created, updated) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.author = author;
    this.created = created;
    this.updated = updated;
  }

  imageURL() {
    return `/assets/images/avatars/${this.id}`;
  }
}
