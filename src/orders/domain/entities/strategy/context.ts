import { OrderSelection } from './abstract/orderSelection';
import { Singer } from './concrete/singer';

export class Context{
  private strategy: OrderSelection;
  constructor() {
    this.strategy = new Singer();
  }
  public setStrategy(strategy: OrderSelection){
    this.strategy = strategy;
  }
  public calculateCost(data: string):number{
    return this.strategy.calculateCost(data);
  }
  public ShowReview(): void{
    this.strategy.showReview();
  }
}