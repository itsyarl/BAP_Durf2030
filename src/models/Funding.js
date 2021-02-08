import { action, decorate, observable } from "mobx";
import { v4 } from "uuid";

class Funding {
  constructor({ id = v4(), product, users = [], projectId, aantal }) {
    this.id = id;
    this.projectId = projectId;
    this.users = users;
    this.product = product;
    this.aantal = aantal;
    this.projects = [];
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.funding.includes(this) && project.linkFunding(this);
  }

}
decorate(Funding, {
  users: observable,
  aantal: observable,
  linkProject: action
});

export default Funding;