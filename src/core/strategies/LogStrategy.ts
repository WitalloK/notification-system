import { NotificationStrategy } from "./NotificationStrategy";

export class LogStrategy implements NotificationStrategy {
  send(message: string): string {
    return `Log registrado: ${message}`;
  }
}
