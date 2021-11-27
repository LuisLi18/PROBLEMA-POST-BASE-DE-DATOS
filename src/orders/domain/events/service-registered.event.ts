import { OrderRegistered } from './order-registered.event';

export class PersonRegistered extends OrderRegistered {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly service: string,
  ) {
    super(id);
  }
}