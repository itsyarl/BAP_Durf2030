import { v4 } from "uuid";

class User {
  constructor({ id = v4(), email, password }) {
    this.id = id;

    this.email = email;
    this.password = password;
  }

}

export default User;
