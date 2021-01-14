import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    this.commentStore = new CommentStore(this);
  }
}

export default RootStore;
