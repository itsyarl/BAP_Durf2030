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

const userConverter = {
  toFirestore: function(user) {
    return {
      userId: user.id,
      email: user.email
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new User({
      email: data.email,
      id: data.userId
    });
  }
};

export { userConverter };
export default User;
