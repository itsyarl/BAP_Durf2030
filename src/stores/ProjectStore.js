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
    const projects = await this.projectService.getAllProjects();
    console.log(projects);
    projects.map(project => this.addProject(project.data));
    // this.addProject(projects);
  };

  addProject = project => {
    // let projectExist = this.projects.findIndex(item => item.id === project.id);
    // if (projectExist === -1) {
      this.projects.push(project);
      // console.log(project)
    // }
  };

  // createGroup = async group => {
  //   //owner instellen van de groep
  //   group.ownerId = this.rootStore.uiStore.currentUser.id;
  //   //create group in firestore backend
  //   const newGroepRef = await this.groupService.create(group);
  //   //id juist zetten met de document id van de backend
  //   group.id = newGroepRef.id;
  //   //de huidige gebruiker toevoegen als member van de groep
  //   await this.groupService.addMemberToProject(
  //     group.id,
  //     this.rootStore.uiStore.currentUser
  //   );
  //   return group;
  // };

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
