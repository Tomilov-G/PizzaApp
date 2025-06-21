const validateValue = require("./validateValue");


describe("validate value", () => {
  test("Корректное значение", () => {
    expect(validateValue(50)).toBe(true);
  });
  test("Меньше корректного", () => {
    expect(validateValue(-1)).toBe(false);
  });
  test("Больше корректного", () => {
    expect(validateValue(101)).toBe(false);
  });
  test("Пограниченое значение слева", () => {
    expect(validateValue(0)).toBe(true);
  });
  test("Пограниченое значение справа", () => {
    expect(validateValue(100)).toBe(true);
  });
});
