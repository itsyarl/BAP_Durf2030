import { decorate, observable} from "mobx";
import ProjectService from "../api/ProjectService.js";
import ChatService from "../api/ChatService.js";

class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.projectService = new ProjectService();
    this.chatService = new ChatService();
    this.projects = [];
    this.filtered = [];
    this.chats = [];
    this.messages = [];
    this.participants = [];
  }

  addMessage = message => {
    this.emptyMessage();
    // console.log(message);
    let messageExist = this.messages.findIndex(item => item.id === message.id);
    if (messageExist === -1) {
      this.messages.push(message);
      // this.projects.map(project=> console.log(project.id));
    }
  }

  getFirstFiltered = (projectObj) => {
    let projectExist = this.filtered.findIndex(item => item.id === projectObj.id);
    if (projectExist === -1) {
      this.filtered.push(projectObj);
    }
  }

  filterProjects = async (thema, status, sorteren) => {
    this.emptyFilter();
    if (thema === "all") {
      const filteredProjects = this.projects.filter( project => {
        return (project.status === status)
      })
      switch (sorteren) {
        case "Geen":
          const sortedAlf = filteredProjects.sort((a, b) => (a.title > b.title) ? -1 : 1);
          sortedAlf.map(project => (
            this.filtered.push(project)
          ));
            break;
        case "Populair":
            const sortedPop = filteredProjects.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
            sortedPop.map(project => (
              this.filtered.push(project)
            ));
            break;
        case "Nieuw":
          const sortedNew = filteredProjects.sort((a, b) => (a.creationDate > b.creationDate) ? -1 : 1);
          sortedNew.map(project => (
            this.filtered.push(project)
          ));
          break;
        default: 
          filteredProjects.map(project => (
            this.filtered.push(project)
            // console.log(project)
          ));
        break;
      // console.log(filteredProjects);
      }
    }else{
      const filteredProjects = this.projects.filter( project => {
        return (project.theme === thema &&
                project.status === status)
      })
      switch (sorteren) {
        case "Geen":
          const sortedAlf = filteredProjects.sort((a, b) => (a.title > b.title) ? -1 : 1);
          sortedAlf.map(project => (
            this.filtered.push(project)
          ));
            break;
        case "Populair":
            const sortedPop = filteredProjects.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
            sortedPop.map(project => (
              this.filtered.push(project)
            ));
            break;
        case "Nieuw":
          const sortedNew = filteredProjects.sort((a, b) => (a.creationDate > b.creationDate) ? -1 : 1);
          sortedNew.map(project => (
            this.filtered.push(project)
          ));
          break;
        default: 
          filteredProjects.map(project => (
            this.filtered.push(project)
            // console.log(project)
          ));
        break;
      // console.log(filteredProjects);
      }
    }
    // console.log(this.filtered);
  } 

  createChatDocument = async (document) => {
    await this.chatService.createChatDocument(document);
  }

  sendMessage = async (content, id) => {
    const message = await this.chatService.sendMessage(content, id);
    console.log(message);
  };

  getMessagesById = async (projectId) => {
    this.emptyMessage();
    await this.chatService.getMessagesById(projectId, this.addMessage);
  }

  emptyMessage = () => {
    this.messages = [];
  }

  emptyFilter = () => {
    this.filtered = [];
  }

  getProjectById = id => {
    this.getMessagesById(id);

    return this.projects.find(project => project.id === id);
  }

  getValidatedProjects = async (state) => {
    await this.projectService.getValidatedProjects(state, this.addProject, this.getFirstFiltered, this.addParticipant);
  } 

  createProject = async project => {
    project.status = "Funding";
    //validation installen als false op het moment dat je een project maakt
    project.validated = false;
    //de creationdate instellen
    project.creationDate = new Date();
    //owner instellen van het project
    project.ownerId = this.rootStore.uiStore.currentUser.id;
    project.ownerName = this.rootStore.uiStore.currentUser.name;
    //create project in fauna backend
    const newProjectRef = await this.projectService.createProject(project);
    //id juist zetten met de document id van de backend
    project.id = newProjectRef.id;
    return project;
  };

  updateProject = async (project, id) => {
    const updated = await this.projectService.updateProject(project, id);
    return updated
  }

  getUsers = async projectId => {
    return await this.projectService.getUsersInProject(projectId);
  }

  approveProject = async id => {
    await this.projectService.approveProject(id);
  }

  addParticipant = participant => {
    let participantExist = this.participants.findIndex(item => item.id === participant.id);
    if (participantExist === -1) {
      this.participants.push(participant);
    }
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

  addParticipantToProject = async (id) => {
    const user = this.rootStore.uiStore.currentUser; 
    await this.projectService.addParticpantToProject(user, id);
  }

  addOwnerToProject = async (project) => {
    const user = project.ownerId; 
    await this.projectService.addOwnerToProject(user, project.id);
  }

  getProjectsChatForUser = async (id) => {
    if (this.rootStore.uiStore.currentUser.projects){
      const project = await this.chatService.getChatsByUser(id)

      let projectExist = this.projects.findIndex(item => item.id === project.id);
      if (projectExist === -1) {
        this.chats.push(project);
    }
  }
  };

  emptyChat = () => {
    this.chats = [];
  }

  empty() {
    this.projects = [];
    this.chats = [];
    this.filtered = [];
  }

}
decorate(ProjectStore, {
  projects: observable,
  messages: observable,
  chats: observable,
  filtered: observable,
});
export default ProjectStore;