import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterOrderItemValidator } from '../validators/register-orderItem.validator';
import { RegisterCompany } from '../commands/register-company.command';
import { RegisterCompanyRequest } from '../dtos/request/register-orderItem-request.dto';
import { RegisterCompanyResponse } from '../dtos/response/register-orderItem-response.dto';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class OrderItemApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCompanyValidator: RegisterOrderItemValidator,
  ) {}

  async register(
    registerCompanyRequest: RegisterCompanyRequest,
  ): Promise<Result<AppNotification, RegisterCompanyResponse>> {
    const notification: AppNotification = await this.registerCompanyValidator.validate(registerCompanyRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerCompany: RegisterCompany = new RegisterCompany(
      registerCompanyRequest.description,
      registerCompanyRequest.address,
      registerCompanyRequest.discount,
      registerCompanyRequest.quantity,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    );
    const customerId = await this.commandBus.execute(registerCompany);
    const registerCompanyResponse: RegisterCompanyResponse =
      new RegisterCompanyResponse(
        customerId,
        registerCompanyRequest.description,
        registerCompanyRequest.address,
        registerCompanyRequest.discount,
        registerCompanyRequest.quantity,
      );
    return Result.ok(registerCompanyResponse);
  }
}