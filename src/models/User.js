import { v4 } from "uuid";

class User {
  constructor({ id = v4(), store, email, password }) {
    this.id = id;
    /*
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;
    this.store.addUser(this);
    */

    this.email = email;
    this.password = password;
  }

}

export default User;
