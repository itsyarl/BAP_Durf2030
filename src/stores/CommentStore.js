// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import CommentService from "../api/CommentService.js";

class CommentStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.commentService = new CommentService();
    this.comments = [];
    this.updates = [];
  }

  createComment = async comment => {
    comment.timestamp = Date();
    comment.userId = this.rootStore.uiStore.currentUser.id;
    return await this.commentService.createComment(comment);
  };

  getCommentsByProjectId = async (id, project) => {
    this.empty();
    await this.commentService.getCommentByProjectId(id, this.addComments, project);
  }

  addComments = (comment, project) => {
    let commentExist = this.comments.findIndex(item => item.id === comment.id);
    if (commentExist === -1) {
      if(comment.userId !== project.ownerId){
        this.comments.push(comment);
      }else{
        this.updates.push(comment);
      }
      // this.projects.map(project=> console.log(project.id));
    }
  }

  empty = () => {
    this.comments = [];
    this.updates = [];
  }
}
decorate(CommentStore, {
  comments: observable,
  // empty: action,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default CommentStore;
