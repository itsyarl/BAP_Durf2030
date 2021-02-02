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

  onAuthStateChanged = async user => {
    if (user) {
      console.log(`De user is ingelogd ${user.email}`);
      this.setCurrentUser(
        new User({
          id: user.id,
          admin: user.admin,
          email: user.email,
          name: user.name,
          projects: user.projects,
          store: this.rootStore.userStore,
        })
      );

      //haalt alle projecten op
      if (user.admin === true) {
        this.rootStore.projectStore.getValidatedProjects(false);
      } else {
        this.rootStore.projectStore.getValidatedProjects(true);
        //haalt chatgroepen voor user op
        this.currentUser.projects.forEach(userProject => { 
          this.rootStore.projectStore.getProjectsChatForUser(userProject);
        })
        this.rootStore.projectStore.filterProjects("All", "Afgerond");
      }

    } else {
      this.rootStore.projectStore.empty();
      // this.rootStore.projectStore.getProjects();
      console.log(`De user is uitgelogd.`);
      this.setCurrentUser(undefined);
    }
  };

  getUserByDocument = async user => {
    await this.userService.getUserByDocument(user,  this.onAuthStateChanged);
  }

  loginUser = async user => {
    //service aanspreken
    const result = await this.userService.login(user);
    await this.userService.getUserByDocument(result.instance.id, this.onAuthStateChanged);
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
