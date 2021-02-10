import { action, decorate, observable } from "mobx";
import { v4 } from "uuid";

class User {
  constructor({ id = v4(), email, avatar = "", password, admin, name, rollen = [],projects = [], companyName }) {
    this.id = id;
    this.admin = admin;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    if (!avatar) {
      this.avatar = `https://avatars.dicebear.com/v2/avataaars/${this.id}.svg`;
    }
    this.password = password;
    this.projects = projects;
    this.companyName = companyName;
    this.rollen = rollen;
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.participants.includes(this) && project.linkParticipant(this);
  }

  linkRol(rol) {
    !this.rollen.includes(rol) && this.rollen.push(rol);
    !rol.participants.includes(this) && rol.linkParticipant(this);
  }
}
decorate(User, {
  rollen: observable,
  linkProject: action,
  linkRol: action
});

export default User;
