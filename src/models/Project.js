import { decorate, observable, action, computed } from "mobx";
import { v4 } from "uuid";

class Project {
  constructor({
    id = v4(),
    title,
    description,
    recap,
    updates = [],
    comments = [],
    size,
    pic = "",
    participants = [],
    store,
    ownerId,
    creationDate,
    theme,
    eventDate,
    likes,
    rols = [],
    location,
    status,
  }) {
    this.id = id;
    this.title = title;
    this.comments = comments;
    this.pic = pic;
    if (!pic) {
      this.pic = `https://avatars.dicebear.com/v2/identicon/${this.id}.svg`;
    }
    this.location = location;
    this.size = size;
    this.recap = recap;
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
    this.ownerId = ownerId;
  }

  // linkComment(comment) {
  //   !this.comments.includes(comment) && this.comments.push(comment);
  // }

  // linkUser(user) {
  //   !this.users.includes(user) && this.users.push(user);
  //   !user.groups.includes(user) && user.linkGroup(this);
  // }
}

decorate(Project, {
  messages: observable,
  users: observable,
  addMessage: action,
  unreadLength: computed,
  lastMessageContent: computed,
  linkUser: action,
  linkMessage: action
});

/*END */
export default Project;
