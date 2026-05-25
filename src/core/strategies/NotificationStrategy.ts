export interface NotificationStrategy {
  send(message: string): string;
}