import { NotificationStrategy } from "../core/strategies/NotificationStrategy";

export class NotificationService {
  constructor(private strategy: NotificationStrategy) {}

  notify(message: string): string {
    return this.strategy.send(message);
  }

  changeStrategy(strategy: NotificationStrategy): void {
    this.strategy = strategy;
  }

  getCurrentStrategyName(): string {
    return this.strategy.constructor.name;
  }
}