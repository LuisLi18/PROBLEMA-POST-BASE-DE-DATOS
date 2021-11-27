import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';
export class Description {
  private readonly value: string;
  private static MAX_LENGTH = 50;
  private constructor(value: string) {
    this.value = value;
  }
  public getValue(): string{
    return this.value;
  }
  public static create(value: string): Result<AppNotification, Description>
  {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('description is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError(
        'description field must have ' + Description.MAX_LENGTH + ' characters',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Description(value));
  }
}