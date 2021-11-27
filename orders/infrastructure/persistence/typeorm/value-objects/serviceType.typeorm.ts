import { Column, Unique } from 'typeorm';
import { Context } from "../../../../domain/entities/strategy/context";
import { Band } from "../../../../domain/entities/strategy/concrete/band";
import { Guitarist } from "../../../../domain/entities/strategy/concrete/guitarist";
import { Pianist } from "../../../../domain/entities/strategy/concrete/pianist";
import { Singer } from "../../../../domain/entities/strategy/concrete/singer";

  export class ServiceTypeTypeorm {
  @Column('varchar', { name: 'service', length: 11, nullable: true })
  value: string;

    private constructor(value: string) {
    this.execute(value);
    this.value = value;
  }
  public execute(value: string): void {
    const context: Context = new Context();
    if (value === 'singer') {
      context.setStrategy(new Singer());
      console.log(context.calculateCost('data'));
      console.log(context.ShowReview()); return;
    }
    if (value === 'band') {
      context.setStrategy(new Band());
      console.log(context.calculateCost('data'));
      console.log(context.ShowReview()); return;
    }
    if (value === 'guitarist') {
      context.setStrategy(new Guitarist());
      console.log(context.calculateCost('data'));
      console.log(context.ShowReview()); return;
    }
    if (value === 'pianist') {
      context.setStrategy(new Pianist());
      console.log(context.calculateCost('data'));
      console.log(context.ShowReview()); return;
    }
      console.log('ServiceType invalid');
  }
  public static from(value: string): ServiceTypeTypeorm {
    return new ServiceTypeTypeorm(value);
  }
}