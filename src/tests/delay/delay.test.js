const delay = require("./delay");

describe("delay", () => {
  test("Корректное значение", async () => {
    const sum = await delay(() => 4 + 4, 1000);
    expect(sum(8)).toBe(8);
  });
});
