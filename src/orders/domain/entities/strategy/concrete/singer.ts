import { OrderSelection } from "../abstract/orderSelection";

export class Singer implements OrderSelection{
  public calculateCost(date: string): number {
    console.log('Singer');
    return (1 - this.showOffer()) * 75;
  }
  public showOffer(): number {
    console.log('This Singer service has no discount');
    return 0;
  }

  public showReview(): void {
    console.log('Review: 4.5 stars');
  }
}