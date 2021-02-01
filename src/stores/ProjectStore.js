import { decorate, observable} from "mobx";
import ProjectService from "../api/ProjectService.js";
import ChatService from "../api/ChatService.js";

class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.projectService = new ProjectService();
    this.chatService = new ChatService();
    this.projects = [];
    this.chats = [];
    this.messages = [];
  }

  addMessage = message => {
    this.emptyMessage();
    console.log(message);
    let messageExist = this.messages.findIndex(item => item.id === message.id);
    if (messageExist === -1) {
      this.messages.push(message);
      // this.projects.map(project=> console.log(project.id));
    }
  }

  createChatDocument = async (document) => {
    await this.chatService.createChatDocument(document);
  }

  sendMessage = async (content, id) => {
    return await this.chatService.sendMessage(content, id);
  };

  getMessagesById = async (projectId) => {
    this.emptyMessage();
    await this.chatService.getMessagesById(projectId, this.addMessage);
  }

  emptyMessage = () => {
    this.messages = [];
  }

  getProjectById = id => {
    //get messages
    this.getMessagesById(id);
    //get comments
    this.getComments(id);
    //find project
    return this.projects.find(project => project.id === id);
  }

  getComments = async id => {
    //get comments
    await this.rootStore.commentStore.getCommentsByProjectId(id);
  }

  getValidatedProjects = async (state) => {
    await this.projectService.getValidatedProjects(state, this.addProject);
  } 

  createProject = async project => {
    //validation installen als false op het moment dat je een project maakt
    project.validated = false;
    //de creationdate instellen
    project.creationDate = new Date();
    //owner instellen van het project
    project.ownerId = this.rootStore.uiStore.currentUser.id;
    project.creatorName = this.rootStore.uiStore.currentUser.name;
    //create project in fauna backend
    const newProjectRef = await this.projectService.createProject(project);
    //id juist zetten met de document id van de backend
    project.id = newProjectRef.id;
    return project;
  };

  getUsers = async projectId => {
    return await this.projectService.getUsersInProject(projectId);
  }

  approveProject = async id => {
    await this.projectService.approveProject(id);
  }

  addProject = project => {
    let projectExist = this.projects.findIndex(item => item.id === project.id);
    if (projectExist === -1) {
      this.projects.push(project);
    }
  };

  addLike = async id => {
    await this.projectService.addLike(
      id,
      this.rootStore.uiStore.currentUser.id
    );
  }

  addParticipantToProject = async(id) => {
    const user = this.rootStore.uiStore.currentUser; 
    await this.projectService.addParticpantToProject(user, id);
  }

  getProjectsChatForUser = async (id) => {
    const project = await this.chatService.getChatsByUser(id)

    let projectExist = this.projects.findIndex(item => item.id === project.id);
    if (projectExist === -1) {
      this.chats.push(project);
    }
  };

  empty() {
    this.projects = [];
    this.chats = [];
  }

}
decorate(ProjectStore, {
  projects: observable,
  messages: observable,
  chats: observable,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default ProjectStore;