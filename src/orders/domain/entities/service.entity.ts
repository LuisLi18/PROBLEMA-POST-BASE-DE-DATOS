import { OrderId } from '../value-objects/order-id.value';
import { Dni } from '../value-objects/dni.value';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Order } from './order.entity';
import { OrderType } from '../enums/order-type.enum';
import { PersonRegistered } from '../events/service-registered.event';
import { Description } from '../../../common/domain/value-objects/description.value';
import { Address } from '../../../common/domain/value-objects/address.value';
import { ServiceType } from "../value-objects/serviceType.value";

export class Service extends Order {
  private name: PersonName;
  private dni: Dni;
  private service: ServiceType;
  public constructor(
    name: PersonName,
    dni: Dni,
    auditTrail: AuditTrail,
    service: ServiceType,
  ) {
    super(OrderType.SERVICE, auditTrail);
    this.name = name;
    this.dni = dni;
    this.service = service;
  }
  public register() {
    const event = new PersonRegistered(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
      this.service.getValue(),
    );
    this.apply(event);
  }
  public getId(): OrderId {
    return this.id;
  }
  public getName(): PersonName {
    return this.name;
  }
  public getDni(): Dni {
    return this.dni;
  }
  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }
  public getServiceType(): ServiceType {
    return this.service;
  }
  public changeName(name: PersonName): void {
    this.name = name;
  }
  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}