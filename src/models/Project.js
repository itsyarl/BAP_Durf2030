import { decorate, observable, action } from "mobx";
import { v4 } from "uuid";

class Project {
  constructor({
    id = v4(),
    title,
    description,
    size,
    ownerName,
    participants = [],
    messages = [],
    funding = [],
    rollen = [],
    comments = [],
    updates = [],
    store,
    ownerId,
    creationDate,
    theme,
    eventDate,
    likes,
    location,
    validated,
    status,
    image,
    likedUsers,
    geo,
  }) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.size = size;
    this.description = description;
    this.theme = theme;
    this.likes = likes
    this.status = status;
    this.messages = messages;
    this.eventDate = eventDate;
    this.participants = participants;
    this.creationDate = creationDate;
    this.validated = validated;
    this.ownerId = ownerId;
    this.ownerName = ownerName; 
    this.store = store;
    this.image = image;
    this.likedUsers = likedUsers;
    this.geo = geo;
    this.comments = comments;
    this.rollen = rollen;
    this.funding = funding;
    this.comments = comments;
    this.updates = updates;
  }

  linkParticipant(participant) {
    !this.participants.includes(participant) && this.participants.push(participant);
    !participant.projects.includes(participant) && participant.linkProject(this);
  }

  linkRol(rol) {
    !this.rollen.includes(rol) && this.rollen.push(rol);
    !rol.projects.includes(rol) && rol.linkProject(this);
  }

  linkComment(comment) {
    !this.comments.includes(comment) && this.comments.push(comment);
    !comment.projects.includes(comment) && comment.linkProject(this);
  }

  linkUpdate(comment) {
    !this.updates.includes(comment) && this.updates.push(comment);
    !comment.projects.includes(comment) && comment.linkProject(this);
  }

  linkFunding(funding) {
    !this.funding.includes(funding) && this.funding.push(funding);
    !funding.projects.includes(funding) && funding.linkProject(this);
  }
}

decorate(Project, {
  messages: observable,
  users: observable,
  likes: observable,
  validated: observable,
  rollen: observable,
  funding: observable,
  comments: observable,
  updates: observable,
  participants: observable,
  linkParticipant: action,
  linkRol: action,
  linkFunding: action,
  linkComment: action
});

export default Project;
