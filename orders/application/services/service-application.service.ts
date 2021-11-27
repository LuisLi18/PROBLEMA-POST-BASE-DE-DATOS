import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPersonRequest } from '../dtos/request/register-service-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-service-response.dto';
import { RegisterServiceValidator } from '../validators/register-service.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPerson } from '../commands/register-service.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class ServiceApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterServiceValidator,
  ) {}

  async register(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<Result<AppNotification, RegisterPersonResponse>> {
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPersonRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerPerson: RegisterPerson = new RegisterPerson(
      registerPersonRequest.firstName,
      registerPersonRequest.lastName,
      registerPersonRequest.dni,
      registerPersonRequest.service,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    );
    const customerId: number = await this.commandBus.execute(registerPerson);
    const registerResponse: RegisterPersonResponse = new RegisterPersonResponse(
      customerId,
      registerPersonRequest.firstName,
      registerPersonRequest.lastName,
      registerPersonRequest.dni,
      registerPersonRequest.service,
    );
    return Result.ok(registerResponse);
  }
}