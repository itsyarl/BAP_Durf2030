// import { decorate} from "mobx";
import { decorate, observable } from "mobx";
import FundingService from "../api/FundingService.js";

class FundingStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.fundingService = new FundingService();
  }

  createFunding = async funding => {
    return await this.fundingService.createFunding(funding);
  };

  getFundingById = async id => {
    this.empty();
    await this.fundingService.getFundingById(id, this.addFunding);
  }

  removeFunding = async (id) => {
    await this.fundingService.removeFunding(id);
  }

  giveFunding = async (participant, product, projectId, aantal) => {
    await this.fundingService.giveFunding(participant, product, projectId, aantal);
  }

}
decorate(FundingStore, {
  funding: observable,
  // addGroup: action,
  // addUser: action,
  // unreadLength: computed
});
export default FundingStore;
