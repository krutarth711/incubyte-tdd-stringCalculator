const add = require("../src/stringCalculator");

test("returns 0 for an empty string", () => {
  expect(add("")).toBe(0);
});

test("returns number for a single element in the string", () => {
  expect(add("1")).toBe(1);
  expect(add("2")).toBe(2);
});

test("two comma separated numbers should return their sum", () => {
  expect(add("1,3")).toBe(4);
  expect(add("1,5")).toBe(6);
});
