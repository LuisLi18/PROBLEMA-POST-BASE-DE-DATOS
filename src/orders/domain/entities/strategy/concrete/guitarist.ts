import { OrderSelection } from "../abstract/orderSelection";

export class Guitarist implements OrderSelection{
  public calculateCost(date: string): number {
    console.log('Band');
    return (1 - this.showOffer()) * 60;
  }
  public showOffer(): number {
    console.log('This guitarist service has no discount');
    return 0;
  }
  public showReview(): void {
    console.log('Review: 4 stars');
  }

}