import { v4 } from "uuid";

class User {
  constructor({ id = v4(),store, email, avatar = "", password, admin, name, projects = [], companyName }) {
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
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.participants.includes(this) && project.linkParticipant(this);
  }
}

export default User;
