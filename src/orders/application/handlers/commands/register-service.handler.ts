import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceFactory } from '../../../domain/factories/service.factory';
import { OrderId } from '../../../domain/value-objects/order-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PersonName } from '../../../../common/domain/value-objects/person-name.value';
import { RegisterPerson } from '../../commands/register-service.command';
import { Service } from '../../../domain/entities/service.entity';
import { ServiceMapper } from '../../mappers/service.mapper';
import { ServiceTypeorm } from '../../../infrastructure/persistence/typeorm/entities/service.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../Identification/domain/value-objects/user-id.value';
import { Description } from "../../../../common/domain/value-objects/description.value";
import { Address } from "../../../../common/domain/value-objects/address.value";
import { ServiceType } from "../../../domain/value-objects/serviceType.value";

@CommandHandler(RegisterPerson)
export class RegisterServiceHandler
  implements ICommandHandler<RegisterPerson> {
  constructor(
    @InjectRepository(ServiceTypeorm)
    private personRepository: Repository<ServiceTypeorm>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterPerson) {
    let customerId: number = 0;
    const personNameResult: Result<AppNotification, PersonName> = PersonName.create(command.firstName, command.lastName);
    if (personNameResult.isFailure()) {
      return customerId;
    }
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return customerId;
    }
    const serviceResult: Result<AppNotification, ServiceType> = ServiceType.create(command.service);
    if (serviceResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let person: Service = ServiceFactory.createFrom(
      personNameResult.value,
      dniResult.value,
      auditTrail,
      serviceResult.value,
    );
    let personTypeORM: ServiceTypeorm = ServiceMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return customerId;
    }
    customerId = Number(personTypeORM.id);
    person.changeId(OrderId.of(customerId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return customerId;
  }
}