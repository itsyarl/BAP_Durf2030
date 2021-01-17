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

  getProjects = async () => {
    const results = await this.projectService.getAllProjects();
    results.map(project => this.addProject(project.data));
  };

  getProjectById = id => this.projects.find(project =>{
    const getProject = project.id === id;
    return getProject;
  });

  createProject = async project => {
    //de creationdate instellen
    project.creationDate = new Date();
    //owner instellen van het project
    project.ownerId = this.rootStore.uiStore.currentUser.id;
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

  // empty() {
  //   this.groups = [];
  // }

}
decorate(ProjectStore, {
  projects: observable,
  // empty: action,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default ProjectStore;