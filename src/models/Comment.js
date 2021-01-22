import { decorate } from "mobx";
import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), projectId, content, userId, timestamp }) {
    // if (!projectId) {
    //   throw new Error("A Comment must have a project");
    // }
    // if (!userId) {
    //   throw new Error("A Comment must have a user");
    // }
    // if (!content || content === "") {
    //   throw new Error("A Comment must have some content");
    // }
    this.id = id;
    this.projectId = projectId;
    this.content = content;
    this.userId = userId;
    // niet meer nodig door onSnapshot
    // this.group.linkComment(this);
    // this.user.linkComment(this);
    this.timestamp = timestamp;
  }
}

decorate(Comment, {

});

export default Comment;