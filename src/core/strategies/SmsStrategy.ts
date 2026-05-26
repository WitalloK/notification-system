import { NotificationStrategy } from "./NotificationStrategy";

export class SmsStrategy implements NotificationStrategy {
  send(message: string): string {
    return `SMS enviado: ${message}`;
  }
}
