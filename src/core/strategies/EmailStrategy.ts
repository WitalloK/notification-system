import { NotificationStrategy } from "./NotificationStrategy";

export class EmailStrategy implements NotificationStrategy {
  send(message: string): string {
    return `Email enviado: ${message}`;
  }
}