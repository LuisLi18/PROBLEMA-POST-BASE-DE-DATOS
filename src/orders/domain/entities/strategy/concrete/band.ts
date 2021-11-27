import { OrderSelection } from "../abstract/orderSelection";

export class Band implements OrderSelection{
  public calculateCost(date: string): number {
    console.log('Band');
    return (1-this.showOffer()) * 240;
  }
  public showOffer(): number {
    console.log('This Band service has 30% of discount');
    return 0.3;
  }
  public showReview(): void {
    console.log('Review: 4 stars');
  }
}