// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import FundingService from "../api/FundingService.js";

class FundingStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.fundingService = new FundingService();
    this.funding = [];
  }

  createFunding = async funding => {
    return await this.fundingService.createFunding(funding);
  };

  getFundingById = async id => {
    return await this.fundingService.getFundingById(id, this.addFunding);
  }

  addFunding = funding => {
    let fundingExist = this.funding.findIndex(item => item.id === funding.id);
    if (fundingExist === -1) {
      this.funding.push(funding);
      // this.projects.map(project=> console.log(project.id));
    }
  }

  removeFunding = async (id) => {
    await this.fundingService.removeFunding(id);
  }

  giveFunding = async (participant, product, projectId, aantal) => {
    await this.fundingService.giveFunding(participant, product, projectId, aantal);
  }

  empty = () => {
    this.funding =[];
  }

}
decorate(FundingStore, {
  funding: observable,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default FundingStore;
