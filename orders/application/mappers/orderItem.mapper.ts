import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { OrderItem } from '../../domain/entities/orderItem';
import { OrderItemTypeorm } from '../../infrastructure/persistence/typeorm/entities/orderItem.typeorm';
import { OrderItemNameTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/orderItem-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { DescriptionTypeorm } from '../../../common/infrastructure/persistence/typeorm/value-objects/description.typeorm';
import { AddressTypeorm } from "../../../common/infrastructure/persistence/typeorm/value-objects/address.typeorm";
import { discountTypeorm } from "../../../common/infrastructure/persistence/typeorm/value-objects/discount.typeorm";

export class OrderItemMapper {
  public static toTypeORM(company: OrderItem): OrderItemTypeorm {
    const companyTypeORM: OrderItemTypeorm = new OrderItemTypeorm();
    const createdAt: string = company.getAuditTrail() != null && company.getAuditTrail().getCreatedAt() != null ? company.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = company.getAuditTrail() != null && company.getAuditTrail().getCreatedBy() != null ? company.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = company.getAuditTrail() != null && company.getAuditTrail().getUpdatedAt() != null ? company.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = company.getAuditTrail() != null && company.getAuditTrail().getUpdatedBy() != null ? company.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    );
    companyTypeORM.auditTrail = auditTrailTypeORM;
    companyTypeORM.description = DescriptionTypeorm.from(
      company.getDescription().getValue(),
    );
    companyTypeORM.address = AddressTypeorm.from(
      company.getAddress().getValue(),
    );
    companyTypeORM.discount = discountTypeorm.from(
      company.getDiscount().getValue(),
    );
    companyTypeORM.address = AddressTypeorm.from(
      company.getQuantity().getValue(),
    );
    return companyTypeORM;
  }
}