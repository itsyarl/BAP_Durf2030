// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import RolService from "../api/RolService.js";

class RolStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rolService = new RolService();
  }

  createRol = async rol => {
    return await this.rolService.createRol(rol);
  };

  getRolesById = async id => {
    this.empty();
    await this.rolService.getRolesById(id, this.addRole);
  }

  updateRol = async (id, waarde, users) => {
    await this.rolService.updateRol(id, waarde, users);
  }

  removeRol = async (id) => {
    await this.rolService.removeRol(id);
  }

  giveRol = async (participant, rol, projectId) => {
    await this.rolService.giveRol(participant, rol, projectId);
  }

}
decorate(RolStore, {
  roles: observable,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default RolStore;
