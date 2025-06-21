const square = require("./square");

describe("square", () => {
  test("Корректное значение", () => {
    expect(square(4)).toBe(16);
  });
  test("Корректное значение", () => {
    expect(square(2)).toBeLessThan(5);
  });
  test("Корректное значение", () => {
    expect(square(4)).toBeGreaterThan(5);
  });
  test("Корректное значение", () => {
    expect(square(4)).not.toBeUndefined();
  });
});
