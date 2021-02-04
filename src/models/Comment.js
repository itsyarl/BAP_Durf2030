import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), projectId, content, userId, timestamp }) {
    this.id = id;
    this.projectId = projectId;
    this.content = content;
    this.userId = userId;
    this.timestamp = timestamp;
  }
}

export default Comment;