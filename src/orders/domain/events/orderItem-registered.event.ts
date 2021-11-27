import { OrderRegistered } from './order-registered.event';

export class CompanyRegistered extends OrderRegistered {
  constructor(
    public readonly id: number,
    public readonly description: string,
    public readonly address: string,
    public readonly discount: string,
    public readonly quantity: string,
  ) {
    super(id);
  }
}