import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { OrderType } from '../../../../domain/enums/order-type.enum';

@Entity('orders')
@TableInheritance({ column: 'type', })
export class OrdersTypeorm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({ name: 'type', type: 'enum', enum: OrderType, default: OrderType.SERVICE })
  readonly type: OrderType;
}