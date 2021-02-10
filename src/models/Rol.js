import { action, decorate, observable } from "mobx";
import { v4 } from "uuid";

class Rol {
  constructor({ id = v4(), name, users = [], projectId, aantal }) {
    this.id = id;
    this.projectId = projectId;
    this.users = users;
    this.name = name;
    this.aantal = aantal;
    this.projects = [];
    this.participants = [];
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.rollen.includes(this) && project.linkRol(this);
  }

  linkParticipant(participant) {
    !this.participants.includes(participant) && this.participants.push(participant);
    !participant.rollen.includes(participant) && participant.linkRol(this);
  }

}
decorate(Rol, {
  users: observable,
  participants: observable,
  aantal: observable,
  linkProject: action,
  linkParticipant: action
});

export default Rol;