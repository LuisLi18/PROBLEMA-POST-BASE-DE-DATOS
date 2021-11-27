export interface OrderSelection {
  calculateCost(date: string): number;
  showOffer(): number;
  showReview(): void;
}