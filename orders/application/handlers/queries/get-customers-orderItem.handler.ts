import { GetCustomersOrderItemQuery } from '../../queries/get-customers-orderItem.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetOrdersOrderItemDto } from '../../dtos/queries/get-orders-orderItem.dto';

@QueryHandler(GetCustomersOrderItemQuery)
export class GetCustomersOrderItemHandler implements IQueryHandler<GetCustomersOrderItemQuery> {
  constructor() {}

  async execute(query: GetCustomersOrderItemQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      description,
      address,
      discount,
      quantity
    FROM 
      orders
    WHERE
      type = 'O'`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetOrdersOrderItemDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetOrdersOrderItemDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.description = ormCustomer.description;
      customerDto.address = ormCustomer.address;
      customerDto.discount = ormCustomer.discount;
      customerDto.quantity = ormCustomer.quantity;
      return customerDto;
    });
    return customers;
  }
}