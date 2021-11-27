import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCompany } from 'src/orders/application/commands/register-company.command';
import { Repository } from 'typeorm';
import { OrderId } from '../../../domain/value-objects/order-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OrderItemMapper } from '../../mappers/orderItem.mapper';
import { CompanyName } from '../../../../common/domain/value-objects/company-name.value';
import { OrderItemFactory } from '../../../domain/factories/orderItem.factory';
import { OrderItem } from '../../../domain/entities/orderItem';
import { OrderItemTypeorm } from '../../../infrastructure/persistence/typeorm/entities/orderItem.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../Identification/domain/value-objects/user-id.value';
import { Description } from "../../../../common/domain/value-objects/description.value";
import { Address } from "../../../../common/domain/value-objects/address.value";
import { Discount } from "../../../../common/domain/value-objects/discount.value";
import { Quantity } from "../../../../common/domain/value-objects/quantity.value";

@CommandHandler(RegisterCompany)
export class RegisterOrderItemHandler
  implements ICommandHandler<RegisterCompany> {
  constructor(
    @InjectRepository(OrderItemTypeorm)
    private companyRepository: Repository<OrderItemTypeorm>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterCompany) {
    let customerId: number = 0;
    const discountResult: Result<AppNotification, Discount> = Discount.create(
      command.discount,
    );
    if (discountResult.isFailure()) {
      return customerId;
    }
    const quantityResult: Result<AppNotification, Quantity> = Quantity.create(
      command.quantity,
    );
    if (quantityResult.isFailure()) {
      return customerId;
    }
    const descriptionResult: Result<AppNotification, Description> = Description.create(command.description);
    if (descriptionResult.isFailure()) {
      return customerId;
    }
    const addressResult: Result<AppNotification, Address> = Address.create(
      command.address,
    );
    if (addressResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null,
    );
    let company: OrderItem = OrderItemFactory.createFrom(
      auditTrail,
      descriptionResult.value,
      addressResult.value,
      discountResult.value,
      quantityResult.value,
    );
    let companyTypeORM: OrderItemTypeorm = OrderItemMapper.toTypeORM(company);
    companyTypeORM = await this.companyRepository.save(companyTypeORM);
    if (companyTypeORM == null) {
      return customerId;
    }
    customerId = Number(companyTypeORM.id);
    company.changeId(OrderId.of(customerId));
    company = this.publisher.mergeObjectContext(company);
    company.register();
    company.commit();
    return customerId;
  }
}