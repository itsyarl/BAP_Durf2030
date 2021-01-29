// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import CommentService from "../api/CommentService.js";

class CommentStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.commentService = new CommentService();
    this.comments = [];
  }

  createComment = async comment => {
    comment.timestamp = Date();
    return await this.commentService.createComment(comment);
  };

  getCommentsByProjectId = async (id) => {
    this.empty();
    await this.commentService.getCommentByProjectId(id, this.addComments);
  }

  addComments = comment => {
    let commentExist = this.comments.findIndex(item => item.id === comment.id);
    if (commentExist === -1) {
      this.comments.push(comment);
      // this.projects.map(project=> console.log(project.id));
    }
  }

  empty = () => {
    this.comments=[];
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
