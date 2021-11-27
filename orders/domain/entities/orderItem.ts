import { OrderId } from '../value-objects/order-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Order } from './order.entity';
import { Ruc } from '../value-objects/ruc.value';
import { OrderType } from '../enums/order-type.enum';
import { CompanyRegistered } from '../events/orderItem-registered.event';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';
import { Description } from '../../../common/domain/value-objects/description.value';
import { Address } from '../../../common/domain/value-objects/address.value';
import { Discount } from "../../../common/domain/value-objects/discount.value";
import { Quantity } from "../../../common/domain/value-objects/quantity.value";

export class OrderItem extends Order {
  private discount: Discount;
  private quantity: Quantity;
  private description: Description;
  private address: Address;

  public constructor(
    auditTrail: AuditTrail,
    description: Description,
    address: Address,
    discount: Discount,
    quantity: Quantity,
  ) {
    super(OrderType.ORDERITEM, auditTrail);
    this.description = description;
    this.address = address;
    this.discount = discount;
    this.quantity = quantity;
  }

  public register() {
    const event = new CompanyRegistered(
      this.id.getValue(),
      this.description.getValue(),
      this.address.getValue(),
      this.discount.getValue(),
      this.quantity.getValue(),
    );
    this.apply(event);
  }
  public getId(): OrderId {
    return this.id;
  }
  public getDescription(): Description {
    return this.description;
  }
  public getAddress(): Address {
    return this.address;
  }
  public getDiscount(): Discount {
    return this.discount;
  }
  public getQuantity(): Quantity {
    return this.quantity;
  }
}