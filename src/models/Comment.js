import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), projectId, content, user, timestamp }) {
    this.id = id;
    this.projectId = projectId;
    this.content = content;
    this.user = user;
    this.timestamp = timestamp;
  }
}

export default Comment;