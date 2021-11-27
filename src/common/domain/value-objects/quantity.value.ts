import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';
export class Quantity {
  private readonly value: string;
  private static MAX_LENGTH = 20;
  private constructor(value: string) {
    this.value = value;
  }
  public getValue(): string{
    return this.value;
  }
  public static create(value: string): Result<AppNotification, Quantity>
  {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('Quantity is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError(
        'Quantity field must have ' + Quantity.MAX_LENGTH + ' characters',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Quantity(value));
  }
}