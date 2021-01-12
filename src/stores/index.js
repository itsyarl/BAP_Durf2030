import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";
import UserStore from "./UserStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
  }
}

export default RootStore;
