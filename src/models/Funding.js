import { decorate, observable } from "mobx";
import { v4 } from "uuid";

class Funding {
  constructor({ id = v4(), product, users = [], projectId, aantal }) {
    this.id = id;
    this.projectId = projectId;
    this.users = users;
    this.product = product;
    this.aantal = aantal;
  }
}
decorate(Funding, {
  aantal: observable,
});

export default Funding;