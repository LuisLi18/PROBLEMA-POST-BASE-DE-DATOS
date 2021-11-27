import { ServiceTypeorm } from '../../infrastructure/persistence/typeorm/entities/service.typeorm';
import { Service } from '../../domain/entities/service.entity';
import { ServiceNameTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/service-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { DescriptionTypeorm } from '../../../common/infrastructure/persistence/typeorm/value-objects/description.typeorm';
import { AddressTypeorm } from '../../../common/infrastructure/persistence/typeorm/value-objects/address.typeorm';
import { ServiceTypeTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/serviceType.typeorm";

export class ServiceMapper {
  public static toTypeORM(person: Service): ServiceTypeorm {
    const personTypeORM: ServiceTypeorm = new ServiceTypeorm();
    personTypeORM.name = ServiceNameTypeorm.from(
      person.getName().getFirstName(),
      person.getName().getLastName(),
    );
    personTypeORM.dni = DniTypeORM.from(person.getDni().getValue());
    const createdAt: string = person.getAuditTrail() != null && person.getAuditTrail().getCreatedAt() != null ? person.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = person.getAuditTrail() != null && person.getAuditTrail().getCreatedBy() != null ? person.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedAt() != null ? person.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedBy() != null ? person.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    );
    personTypeORM.auditTrail = auditTrailTypeORM;
    personTypeORM.service = ServiceTypeTypeorm.from(
      person.getServiceType().getValue(),
    );
    return personTypeORM;
  }
}