import { decorate, observable } from "mobx";
import { v4 } from "uuid";

class Rol {
  constructor({ id = v4(), name, users = [], projectId, aantal }) {
    this.id = id;
    this.projectId = projectId;
    this.users = users;
    this.name = name;
    this.aantal = aantal;
  }
}
decorate(Rol, {
  users: observable,
});

export default Rol;