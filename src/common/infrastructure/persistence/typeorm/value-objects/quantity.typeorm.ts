import { Column, Unique } from 'typeorm';

export class quantityTypeorm {
  @Column('varchar', { name: 'quantity', length: 20, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): quantityTypeorm {
    return new quantityTypeorm(value);
  }
}