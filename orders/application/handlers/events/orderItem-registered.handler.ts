import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CompanyRegistered } from '../../../domain/events/orderItem-registered.event';

@EventsHandler(CompanyRegistered)
export class OrderItemRegisteredHandler implements IEventHandler<CompanyRegistered> {
  constructor() {}

  handle(event: CompanyRegistered) {
    console.log('handle logic for CompanyRegistered');
    console.log(event);
  }
}