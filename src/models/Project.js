import { decorate, observable, action } from "mobx";
import { v4 } from "uuid";

class Project {
  constructor({
    id = v4(),
    title,
    description,
    size,
    creatorName,
    participants = [],
    messages = [],
    store,
    ownerId,
    creationDate,
    theme,
    eventDate,
    likes,
    location,
    validated,
    status,
    donationGoal,
    image,
    likedUsers,
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
    this.eventData = eventDate;
    this.participants = participants;
    this.creationDate = creationDate;
    this.validated = validated;
    this.ownerId = ownerId;
    this.donationGoal = donationGoal;
    this.creatorName = creatorName; 
    this.store = store;
    this.image = image;
    this.likedUsers = likedUsers;
  }

  // linkComment(comment) {
  //   !this.comments.includes(comment) && this.comments.push(comment);
  // }

  linkParticipant(participant) {
    !this.participants.includes(participant) && this.participants.push(participant);
    !participant.projects.includes(participant) && participant.linkProject(this);
  }

  linkMessage(message) {
    !this.messages.includes(message) && this.messages.push(message);
  }
}

decorate(Project, {
  messages: observable,
  users: observable,
  likes: observable,
  validated: observable,
  participants: observable,
  likedUsers: observable,
  linkParticipant: action,
  addLike: action
});

export default Project;
