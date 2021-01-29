import { decorate, observable, action } from "mobx";
import UserService from "../api/UserService.js";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService();
  }

  getUserByEmail = async email => {
    const result = await this.userService.getUserByEmail(email);
    console.log(result);
    return result.data();
  }

  createUser = async user => {
    return await this.userService.createUser(user);
  };

  checkLoggedIn = async (userKey) => {
    return await this.userService.checkLoggedIn(userKey);
  } 
}

decorate(UserStore, {
  users: observable,
  empty: action
});

export default UserStore;
