import { v4 } from "uuid";

class Message {
  constructor({ id = v4(), projectId, messages = {} }) {
    this.id = id;
    this.projectId = projectId;
    this.messages = messages;
  }
}

export default Message;
