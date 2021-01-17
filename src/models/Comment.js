import { action, computed, decorate, observable } from "mobx";
import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), content, userId, projectId, timestamp, idea = false }) {
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
    this.idea = idea;
  }
}

decorate(Comment, {
  messages: observable,
  users: observable,
  addMessage: action,
  unreadLength: computed,
  lastMessageContent: computed,
  linkUser: action,
  linkMessage: action
});

export default Comment;
