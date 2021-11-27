import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { OrdersTypeorm } from '../../infrastructure/persistence/typeorm/entities/orders.typeorm';
import { OrderItemTypeorm } from '../../infrastructure/persistence/typeorm/entities/orderItem.typeorm';
import { RegisterCompanyRequest } from '../dtos/request/register-orderItem-request.dto';

@Injectable()
export class RegisterOrderItemValidator {
  constructor(
    @InjectRepository(OrderItemTypeorm)
    private companyRepository: Repository<OrderItemTypeorm>,
  ) {
  }

  public async validate(
    registerCompanyRequest: RegisterCompanyRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const description: string = registerCompanyRequest.description ? registerCompanyRequest.description.trim() : '';
    if (description.length <= 0) {
      notification.addError('Musician description is required', null);
    }
    const address: string = registerCompanyRequest.address
      ? registerCompanyRequest.address.trim()
      : '';
    if (address.length <= 0) {
      notification.addError('Musician address is required', null);
    }
    const discount: string = registerCompanyRequest.discount
      ? registerCompanyRequest.discount.trim()
      : '';
    if (discount.length <= 0) {
      notification.addError('discount is required', null);
    }
    const quantity: string = registerCompanyRequest.quantity
      ? registerCompanyRequest.quantity.trim()
      : '';
    if (quantity.length <= 0) {
      notification.addError('quantity is required', null);
    }
    return notification;
  }
}