import { Column, Unique } from 'typeorm';

export class discountTypeorm {
  @Column('varchar', { name: 'discount', length: 20, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): discountTypeorm {
    return new discountTypeorm(value);
  }
}