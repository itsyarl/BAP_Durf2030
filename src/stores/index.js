import UiStore from "./UiStore";
import UserStore from "./UserStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.uiStore = new UiStore(this);
  }
}

export default RootStore;
