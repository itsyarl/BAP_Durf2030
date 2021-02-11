import { action, decorate } from "mobx";
import { v4 } from "uuid";

class Comment {
  constructor({ id = v4(), content, projectId, userId, timestamp, userName }) {
    this.id = id;
    this.projectId = projectId;
    this.content = content;
    this.userId = userId;
    this.userName = userName;
    this.timestamp = timestamp;
    this.projects = [];
  }

  linkProjectComment(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.comments.includes(this) && project.linkComment(this);
  }

  linkProjectUpdate(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.updates.includes(this) && project.linkUpdate(this);
  }


}
decorate(Comment, {
  linkProject: action
});

export default Comment;