export interface Observer {
  update(event: string, data: unknown): void;
}