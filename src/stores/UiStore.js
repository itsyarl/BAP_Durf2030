import { decorate, observable, action } from "mobx";
import UserService from "../api/UserService";
import User from "../models/User";

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.userService = new UserService();
  }

  onAuthStateChanged = async (user) => {
    if (user) {
      console.log(`De user is ingelogd`);
      this.setCurrentUser(
        new User({
          id: user.uid,
          email: user.email,
          store: this.rootStore.userStore,
        })
      ); 
    } else {
      console.log(`De user is uitgelogd.`);
      this.rootStore.userStore.empty();
      this.setCurrentUser(undefined);
    }
  };

  loginUser = async user => {
    //service aanspreken
    const result = await this.userService.login(user);
    this.onAuthStateChanged(result);
    return result;
  };

  registerUser = async user => {
    if (user) {
      //user toevoegen aan onze users collection
      this.rootStore.userStore.createUser(user);
    }

    return user;
  };

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

decorate(UiStore, {
  currentUser: observable,
  setCurrentUser: action
});

export default UiStore;
