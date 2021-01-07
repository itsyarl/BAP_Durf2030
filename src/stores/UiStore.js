import { decorate, observable, action } from "mobx";
import User from "../models/User";

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
  }

  onAuthStateChanged = user => {
    if (user) {
      console.log(`De user is ingelogd: ${user.email}`);
      this.setCurrentUser(
        new User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          store: this.rootStore.userStore,
          avatar: user.photoURL
        })
      );
      //inlezen van de groepen
      this.rootStore.groupStore.getGroups();

      //inlezen van de contacten van de currentuser
      this.rootStore.userStore.getContactsForUser();
    } else {
      console.log(`De user is uitgelogd.`);
      this.rootStore.userStore.empty();
      this.rootStore.groupStore.empty();
      this.setCurrentUser(undefined);
    }
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
