import { AggregateRoot } from '@nestjs/cqrs';
import { OrderId } from '../value-objects/order-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { OrderType } from '../enums/order-type.enum';
import { Description } from "../../../common/domain/value-objects/description.value";
import { Address } from "../../../common/domain/value-objects/address.value";

export class Order extends AggregateRoot {
  protected id: OrderId;
  protected type: OrderType;
  protected readonly auditTrail: AuditTrail;

  public constructor(
    type: OrderType,
    auditTrail: AuditTrail,
  ) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }
  public getId(): OrderId {
    return this.id;
  }
  public getType(): OrderType {
    return this.type;
  }
  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }
  public changeId(id: OrderId) {
    this.id = id;
  }
}