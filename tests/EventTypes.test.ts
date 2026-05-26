import { EventTypes } from "../src/core/events/EventTypes";

describe("EventTypes", () => {
  it("should have SALE_CREATED with correct value", () => {
    expect(EventTypes.SALE_CREATED).toBe("SALE_CREATED");
  });

  it("should be usable as a string", () => {
    const event: string = EventTypes.SALE_CREATED;

    expect(typeof event).toBe("string");
  });
});
