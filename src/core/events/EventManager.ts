import { Observer } from "../observers/Observer";

export class EventManager {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(
      (currentObserver) => currentObserver !== observer
    );
  }

  notify(event: string, data: unknown): void {
    this.observers.forEach((observer) => {
      observer.update(event, data);
    });
  }

  getObserversCount(): number {
    return this.observers.length;
  }
}