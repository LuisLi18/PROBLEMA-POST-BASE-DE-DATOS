import { Column } from 'typeorm';

export class OrderItemNameTypeorm {
  @Column('varchar', { name: 'company_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): OrderItemNameTypeorm {
    return new OrderItemNameTypeorm(name);
  }
}