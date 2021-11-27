import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterPersonRequest } from '../application/dtos/request/register-service-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-service-response.dto';
import { OrderItemApplicationService } from '../application/services/orderItem-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetCustomersServiceQuery } from '../application/queries/get-customers-service.query';
import { ServiceApplicationService } from '../application/services/service-application.service';
import { RegisterCompanyRequest } from '../application/dtos/request/register-orderItem-request.dto';
import { RegisterCompanyResponse } from '../application/dtos/response/register-orderItem-response.dto';
import { GetCustomersOrderItemQuery } from '../application/queries/get-customers-orderItem.query';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly personApplicationService: ServiceApplicationService,
    private readonly companyApplicationService: OrderItemApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/service')
  async registerPerson(
    @Body() registerPersonRequest: RegisterPersonRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPersonResponse> =
        await this.personApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/orderItem')
  async registerCompany(
    @Body() registerCompanyRequest: RegisterCompanyRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCompanyResponse> =
        await this.companyApplicationService.register(registerCompanyRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/service')
  async getCustomersPerson(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetCustomersServiceQuery(),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/orderItem')
  async getCustomersCompany(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetCustomersOrderItemQuery(),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}