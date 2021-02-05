// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import RolService from "../api/RolService.js";

class RolStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rolService = new RolService();
    this.roles = [];
  }

  createRol = async rol => {
    return await this.rolService.createRol(rol);
  };

  getRolesById = async id => {
    return await this.rolService.getRolesById(id, this.addRole);
  }

  addRole = role => {
    let roleExist = this.roles.findIndex(item => item.id === role.id);
    if (roleExist === -1) {
      this.roles.push(role);
      // this.projects.map(project=> console.log(project.id));
    }
  }

  removeRol = async (id) => {
    await this.rolService.removeRol(id);
  }

  giveRoll = async (participant, role, projectId) => {
    await this.rolService.giveRol(participant, role, projectId);
  }

  empty = () => {
    this.roles = [];
  }

}
decorate(RolStore, {
  roles: observable,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default RolStore;
