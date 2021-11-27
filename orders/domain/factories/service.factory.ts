import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../value-objects/dni.value';
import { Service } from '../entities/service.entity';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { Description } from "../../../common/domain/value-objects/description.value";
import { Address } from "../../../common/domain/value-objects/address.value";
import { ServiceType } from "../value-objects/serviceType.value";

export class ServiceFactory {
  public static createFrom(
    name: PersonName,
    dni: Dni,
    auditTrail: AuditTrail,
    service: ServiceType,
  ): Service {
    return new Service(name, dni, auditTrail, service);
  }
}