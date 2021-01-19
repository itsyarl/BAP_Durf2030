import { decorate, observable} from "mobx";
import ProjectService from "../api/ProjectService.js";

class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.projectService = new ProjectService();
    this.projects = [];
    this.validated = [];
  }

  // addContactToGroup = async (contact, group) => {
  //   return await this.groupService.addMemberToGroup(group.id, contact);
  // };

  // getProjects = async () => {
  //   const results = await this.projectService.getAllProjects();
  //   results.map(project => this.addProject(project.data));
  // };

  getProjectById = id => this.projects.find(project =>{
    const getProject = project.id === id;
    return getProject;
  });

  getValidatedProjects = async (state) => {
    const results = await this.projectService.getValidatedProjects(state);
    results.map(project => this.addProject(project.data));
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
    //de huidige gebruiker toevoegen als member van het project
    await this.projectService.addMemberToProject(
      project.id,
      this.rootStore.uiStore.currentUser
    );
    return project;
  };

  approveProject = async id => {
    await this.projectService.approveProject(id);
  }

  addProject = project => {
    console.log(project);
    let projectExist = this.projects.findIndex(item => item.id === project.id);
    if (projectExist === -1) {
      this.projects.push(project);
      // this.projects.map(project=> console.log(project.id));
    }
  };

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