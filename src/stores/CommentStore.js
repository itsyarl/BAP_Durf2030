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
    await this.empty();
    const comments = await this.commentService.getCommentByProjectId(id);
    return await comments.map(comment => {
      this.comments.push(comment.data);
      return comment.data;
    })
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
