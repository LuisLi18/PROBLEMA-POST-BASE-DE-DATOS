import { ChildEntity, Column, Unique } from 'typeorm';
import { OrdersTypeorm } from './orders.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { ServiceNameTypeorm } from '../value-objects/service-name.typeorm';
import { OrderType } from '../../../../domain/enums/order-type.enum';
import { DescriptionTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/description.typeorm";
import { AddressTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/address.typeorm";
import { ServiceTypeTypeorm } from "../value-objects/serviceType.typeorm";

@ChildEntity(OrderType.SERVICE)
@Unique('UQ_customers_dni', ['dni.value'])
export class ServiceTypeorm extends OrdersTypeorm {
  @Column((type) => ServiceNameTypeorm, { prefix: false })
  public name: ServiceNameTypeorm;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

  @Column((type) => ServiceTypeTypeorm, { prefix: false })
  public service: ServiceTypeTypeorm;
}