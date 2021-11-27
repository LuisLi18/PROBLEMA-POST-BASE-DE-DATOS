import { Module } from '@nestjs/common';
import { OrdersController } from './api/orders.controller';
import { OrderItemApplicationService } from './application/services/orderItem-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterServiceValidator } from './application/validators/register-service.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterOrderItemHandler } from './application/handlers/commands/register-orderItem.handler';
import { ServiceRegisteredHandler } from './application/handlers/events/service-registered.handler';
import { GetCustomersServiceHandler } from './application/handlers/queries/get-customers-service.handler';
import { ServiceApplicationService } from './application/services/service-application.service';
import { RegisterOrderItemValidator } from './application/validators/register-orderItem.validator';
import { RegisterServiceHandler } from './application/handlers/commands/register-service.handler';
import { OrderItemTypeorm } from './infrastructure/persistence/typeorm/entities/orderItem.typeorm';
import { ServiceTypeorm } from './infrastructure/persistence/typeorm/entities/service.typeorm';
import { OrdersTypeorm } from './infrastructure/persistence/typeorm/entities/orders.typeorm';
import { OrderItemRegisteredHandler } from './application/handlers/events/orderItem-registered.handler';
import { GetCustomersOrderItemHandler } from './application/handlers/queries/get-customers-orderItem.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [RegisterServiceHandler, RegisterOrderItemHandler];
export const EventHandlers = [
  ServiceRegisteredHandler,
  OrderItemRegisteredHandler,
  MoneyTransferredHandler,
];
export const QueryHandlers = [
  GetCustomersServiceHandler,
  GetCustomersOrderItemHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrdersTypeorm, ServiceTypeorm, OrderItemTypeorm]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrdersController],
  providers: [
    ServiceApplicationService,
    OrderItemApplicationService,
    RegisterServiceValidator,
    RegisterOrderItemValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class CustomersModule {}