import { OrderSelection } from "../abstract/orderSelection";

export class Pianist implements OrderSelection{
  public calculateCost(date: string): number {
    console.log('Pianist');
    return (1 - this.showOffer()) * 75;
  }
  public showOffer(): number {
    console.log('This pianist service has 20% of discount');
    return 0.2;
  }

  public showReview(): void {
    console.log('Review: 5 stars');
  }
}