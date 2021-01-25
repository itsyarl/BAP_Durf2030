import { decorate, observable} from "mobx";
import ProjectService from "../api/ProjectService.js";

class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.projectService = new ProjectService();
    this.projects = [];
  }

  // addContactToGroup = async (contact, group) => {
  //   return await this.groupService.addMemberToGroup(group.id, contact);
  // };

  // getProjects = async () => {
  //   const results = await this.projectService.getAllProjects();
  //   results.map(project => this.addProject(project.data));
  // };

  getProjectById = id => {
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

  addParticipantToProject = async(id) => {
    const user = this.rootStore.uiStore.currentUser; 
    await this.projectService.addParticpantToProject(user, id);
  }

  // getGroupById = id => this.groups.find(group => group.id === id);

  // addUser = (user, group) => {
  //   group.linkUser(user);
  // };

  empty() {
    this.projects = [];
  }

}
decorate(ProjectStore, {
  projects: observable,
  // empty: action,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default ProjectStore;