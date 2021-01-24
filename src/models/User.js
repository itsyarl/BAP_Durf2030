import { v4 } from "uuid";

class User {
  constructor({ id = v4(),store, email, password, admin, name, projects = [] }) {
    this.id = id;
    this.admin = admin;
    this.name = name;
    this.email = email;
    this.password = password;
    this.projects = projects;
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.participants.includes(this) && project.linkParticipant(this);
  }
}

export default User;
