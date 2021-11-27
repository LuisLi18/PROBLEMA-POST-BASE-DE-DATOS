import { ChildEntity, Column, Unique } from 'typeorm';
import { OrdersTypeorm } from './orders.typeorm';
import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { OrderItemNameTypeorm } from '../value-objects/orderItem-name.typeorm';
import { OrderType } from '../../../../domain/enums/order-type.enum';
import { DescriptionTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/description.typeorm";
import { AddressTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/address.typeorm";
import { discountTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/discount.typeorm";
import { quantityTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/value-objects/quantity.typeorm";

@ChildEntity(OrderType.ORDERITEM)
export class OrderItemTypeorm extends OrdersTypeorm {

  @Column((type) => DescriptionTypeorm, { prefix: false })
  public description: DescriptionTypeorm;

  @Column((type) => AddressTypeorm, { prefix: false })
  public address: AddressTypeorm;

  @Column((type) => discountTypeorm, { prefix: false })
  public discount: discountTypeorm;

  @Column((type) => quantityTypeorm, { prefix: false })
  public quantity: quantityTypeorm;
}