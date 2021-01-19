import { decorate, observable, action } from "mobx";
import { v4 } from "uuid";

class Project {
  constructor({
    id = v4(),
    title,
    description,
    updates = [],
    size,
    pic = "",
    creatorName,
    participants = [],
    store,
    ownerId,
    creationDate,
    theme,
    eventDate,
    likes,
    rols = [],
    location,
    validated,
    status,
    donationGoal
  }) {
    this.id = id;
    this.title = title;
    this.pic = pic;
    if (!pic) {
      this.pic = `https://avatars.dicebear.com/v2/identicon/${this.id}.svg`;
    }
    this.location = location;
    this.size = size;
    this.description = description;
    this.updates = updates;
    this.participants = participants;
    this.rols = rols;
    this.theme = theme;
    this.likes = likes
    this.store = store;
    this.status = status;
    this.eventData = eventDate;
    this.creationDate = creationDate;
    this.validated = validated;
    this.ownerId = ownerId;
    this.donationGoal = donationGoal;
    this.creatorName = creatorName; 
  }

  // linkComment(comment) {
  //   !this.comments.includes(comment) && this.comments.push(comment);
  // }

  // linkUser(user) {
  //   !this.user.includes(user) && this.user= `user`);
  //   !user.projects.includes(user) && user.linkProject(this);
  // }
}

decorate(Project, {
  messages: observable,
  users: observable,
  linkUser: action,
});

/*END */
export default Project;
