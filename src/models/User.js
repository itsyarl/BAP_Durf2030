import { v4 } from "uuid";

class User {
  constructor({ id = v4(), email, password, admin, projects = [], name }) {
    this.id = id;
    this.admin = admin;
    this.name = name;
    this.email = email;
    this.password = password;
    this.pojects = projects;
  }
}

export default User;
