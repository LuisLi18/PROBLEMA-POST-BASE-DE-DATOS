import { GetCustomersServiceQuery } from '../../queries/get-customers-service.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetOrdersServiceDto } from '../../dtos/queries/get-orders-service.dto';

@QueryHandler(GetCustomersServiceQuery)
export class GetCustomersServiceHandler implements IQueryHandler<GetCustomersServiceQuery> {
  constructor() {}

  async execute(query: GetCustomersServiceQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni,
      service
    FROM 
      orders
    WHERE
      type = 'S'
    ORDER BY
      last_name, first_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetOrdersServiceDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetOrdersServiceDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.firstName = ormCustomer.firstName;
      customerDto.lastName = ormCustomer.lastName;
      customerDto.dni = ormCustomer.dni;
      customerDto.service = ormCustomer.service;
      return customerDto;
    });
    return customers;
  }
}