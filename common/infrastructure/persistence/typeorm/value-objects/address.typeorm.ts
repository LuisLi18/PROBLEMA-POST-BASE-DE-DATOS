import { Column, Unique } from 'typeorm';

export class AddressTypeorm {
  @Column('varchar', { name: 'address', length: 75, nullable: false })
  public address: string;

  private constructor(address: string) {
    this.address = address;
  }

  public static from(address: string): AddressTypeorm {
    return new AddressTypeorm(address);
  }
}