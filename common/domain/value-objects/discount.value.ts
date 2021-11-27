import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';
export class Discount {
  private readonly value: string;
  private static MAX_LENGTH = 20;
  private constructor(value: string) {
    this.value = value;
  }
  public getValue(): string{
    return this.value;
  }
  public static create(value: string): Result<AppNotification, Discount>
  {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('Discount is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError(
        'Discount field must have ' + Discount.MAX_LENGTH + ' characters',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Discount(value));
  }
}