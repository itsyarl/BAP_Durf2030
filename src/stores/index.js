import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";
import RolStore from "./RolStore";
import FundingStore from "./FundingStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    this.commentStore = new CommentStore(this);
    this.rolStore = new RolStore(this);
    this.fundingStore = new FundingStore(this);
  }
}

export default RootStore;
