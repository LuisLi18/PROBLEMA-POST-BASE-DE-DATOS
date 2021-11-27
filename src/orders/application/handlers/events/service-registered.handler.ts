import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PersonRegistered } from '../../../domain/events/service-registered.event';

@EventsHandler(PersonRegistered)
export class ServiceRegisteredHandler implements IEventHandler<PersonRegistered> {
  constructor() {}

  handle(event: PersonRegistered) {
    console.log('handle logic for PersonRegistered');
    console.log(event);
  }
}