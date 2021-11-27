import { OrderId } from '../value-objects/order-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';
import { OrderItem } from '../entities/orderItem';
import { Ruc } from '../value-objects/ruc.value';
import { Description } from "../../../common/domain/value-objects/description.value";
import { Address } from "../../../common/domain/value-objects/address.value";
import { Discount } from "../../../common/domain/value-objects/discount.value";
import { Quantity } from "../../../common/domain/value-objects/quantity.value";

export class OrderItemFactory {
  public static createFrom(
    auditTrail: AuditTrail,
    description: Description,
    address: Address,
    discount: Discount,
    quantity: Quantity,
  ): OrderItem {
    return new OrderItem(auditTrail, description, address, discount, quantity);
  }
}