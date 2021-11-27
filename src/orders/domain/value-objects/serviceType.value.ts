import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { Context } from "../entities/strategy/context";

export class ServiceType {
  private readonly value: string;
  private static MAX_LENGTH: number = 20;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, ServiceType>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('ServiceType is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError(
        'ServiceType field must have ' + ServiceType.MAX_LENGTH + ' characters',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ServiceType(value));
  }
}