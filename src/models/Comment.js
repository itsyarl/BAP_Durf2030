import { action, decorate } from "mobx";
import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), content, userId, timestamp }) {
    this.id = id;
    this.projectId = [];
    this.content = content;
    this.userId = userId;
    this.timestamp = timestamp;
    this.projects = [];
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.comments.includes(this) && project.linkComment(this);
  }


}
decorate(Comment, {
  linkProject: action
});

export default Comment;