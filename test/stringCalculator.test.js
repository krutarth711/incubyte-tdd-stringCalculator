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

test("any number of comma separated numbers should return their sum", () => {
  expect(add("1,2,3,4,5")).toBe(15);
  expect(add("13,12,1")).toBe(26);
});

test("new line instead of comma between numbers", () => {
  expect(add("1\n2,3\n4")).toBe(10);
});

test("support custom delimiter with a pattern", () => {
  expect(add("//;\n1;2")).toBe(3);
  expect(add("//?\n1?2?3")).toBe(6);
});

test("should multiple the numbers if the delimiter is a single *", () => {
  expect(add("//*\n2*2*3")).toBe(12);
});

test("negative numbers should throw exception with details", () => {
  expect(() => add("-1,2,3")).toThrow("Negative numbers not allowed: -1");
  expect(() => add("1,-2,-3")).toThrow("Negative numbers not allowed: -2,-3");
});

test("numbers greater than 1000 should be ignored", () => {
  expect(add("1,1001")).toBe(1);
  expect(add("3,1000")).toBe(1003);
});

test("handles custom delimiters of any length", () => {
  expect(add("//[***]\n1***2***3")).toBe(6);
});

test("handles multiple single-character delimiters", () => {
  expect(add("//[*][%]\n1*2%3")).toBe(6);
});

test("handles multiple delimiters with varying lengths", () => {
  expect(add("//[***][%%%]\n1***2%%%3")).toBe(6);
});
