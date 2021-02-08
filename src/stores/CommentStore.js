// import { decorate} from "mobx";
import { action, decorate, observable } from "mobx";
import CommentService from "../api/CommentService.js";

class CommentStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.commentService = new CommentService();
  }

  createComment = async comment => {
    comment.timestamp = Date();
    comment.userId = this.rootStore.uiStore.currentUser.id;
    return await this.commentService.createComment(comment);
  };

  getCommentsByProjectId = async (id, project) => {
    return await this.commentService.getCommentByProjectId(id, this.addComments, project);
  }

  addComments = (comment, project) => {
    let commentExist = project.comments.findIndex(item => item.id === comment.id);
    if (commentExist === -1) {
      if(comment.userId !== project.ownerId){
        project.comments.push(comment);
      }else{
        project.updates.push(comment);
      }
      // this.projects.map(project=> console.log(project.id));
    }
  }
}
decorate(CommentStore, {
  comments: observable,
  empty: action,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default CommentStore;
