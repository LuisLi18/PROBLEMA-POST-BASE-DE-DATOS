import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Address {
  private readonly address: string;
  private static ADDRESS_MAX_LENGTH = 75;

  private constructor(address: string) {
    this.address = address;
  }
  public getValue() {
    return this.address;
  }
  public static create(
    address: string
  ): Result<AppNotification, Address> {
    const notification: AppNotification = new AppNotification();
    address = (address ?? '').trim();
    if (address === '') {
      notification.addError('address is required', null);
    }
    if (address.length > this.ADDRESS_MAX_LENGTH) {
      notification.addError(
        'The maximum length of an address is ' +
        this.ADDRESS_MAX_LENGTH +
        ' characters including spaces',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Address(address));
  }
}