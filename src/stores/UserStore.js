import { decorate, observable, action } from "mobx";
import UserService from "../api/UserService.js";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService();
    this.users = [];
  }

  createUser = async user => {
    return await this.userService.createUser(user);
  };

  empty() {
    this.users = [];
  }

}

decorate(UserStore, {
  users: observable,
  empty: action
});

export default UserStore;
