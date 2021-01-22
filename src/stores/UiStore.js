import { decorate, observable, action } from "mobx";
import UserService from "../api/UserService";
import User from "../models/User";

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.userService = new UserService();
  }

  logoutUser = async () => {
    const result = await this.userService.logout();
    await this.onAuthStateChanged();
    return result;
  };

  onAuthStateChanged = user => {
    if (user) {
      console.log(`De user is ingelogd ${user.email}`);
      this.setCurrentUser(
        new User({
          id: user.id,
          admin: user.admin,
          email: user.email,
          store: this.rootStore.userStore,
        })
      );

      //haalt alle projecten op
      if (user.admin === true) {
        this.rootStore.projectStore.getValidatedProjects(false);
      } else {
        this.rootStore.projectStore.getValidatedProjects(true);
      }
    } else {
      this.rootStore.projectStore.empty();
      // this.rootStore.projectStore.getProjects();
      console.log(`De user is uitgelogd.`);
      this.rootStore.userStore.empty();
      this.setCurrentUser(undefined);
    }
  };

  getUserByDocument = async user => {
    const loggedInUser = await this.userService.getUserByDocument(user);
    this.onAuthStateChanged(loggedInUser);
  }

  loginUser = async user => {
    //service aanspreken
    const result = await this.userService.login(user);
    const loggedInUser = await this.userService.getUserByDocument(result.instance.id);
    this.onAuthStateChanged(loggedInUser.data);
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
