import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterPersonRequest } from '../dtos/request/register-service-request.dto';
import { Repository } from 'typeorm';
import { OrdersTypeorm } from '../../infrastructure/persistence/typeorm/entities/orders.typeorm';
import { ServiceTypeorm } from '../../infrastructure/persistence/typeorm/entities/service.typeorm';

@Injectable()
export class RegisterServiceValidator {
  constructor(
    @InjectRepository(ServiceTypeorm)
    private personRepository: Repository<ServiceTypeorm>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPersonRequest.firstName ? registerPersonRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPersonRequest.lastName ? registerPersonRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPersonRequest.dni ? registerPersonRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: OrdersTypeorm = await this.personRepository
      .createQueryBuilder()
      .where('dni = :dni', { dni })
      .getOne();
    if (customer != null) {
      notification.addError('dni is taken', null);
    }
    const service: string = registerPersonRequest.service ? registerPersonRequest.service.trim() : '';
    if (service.length <= 0) {
      notification.addError('service is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}