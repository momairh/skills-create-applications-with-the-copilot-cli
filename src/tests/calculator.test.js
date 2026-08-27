/**
 * Unit tests for src/calculator.js
 *
 * Covers the four basic arithmetic operations (addition, subtraction,
 * multiplication, division) exposed by the calculator module, using the
 * example operations from images/calc-basic-operations.png:
 *   2 + 3, 10 - 4, 45 * 2, 20 / 5
 * plus additional edge cases (negatives, decimals, division by zero,
 * and invalid operators).
 */

const { add, subtract, multiply, divide, calculate } = require("../calculator");

describe("add", () => {
  test("2 + 3 = 5 (example from image)", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("adds decimals", () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test("adding zero returns the other operand", () => {
    expect(add(0, 7)).toBe(7);
  });
});

describe("subtract", () => {
  test("10 - 4 = 6 (example from image)", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracting a larger number yields a negative result", () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test("subtracts decimals", () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

describe("multiply", () => {
  test("45 * 2 = 90 (example from image)", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("multiplying by zero returns zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test("multiplies negative numbers", () => {
    expect(multiply(-3, 4)).toBe(-12);
    expect(multiply(-3, -4)).toBe(12);
  });

  test("multiplies decimals", () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe("divide", () => {
  test("20 / 5 = 4 (example from image)", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("divides negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test("divides decimals", () => {
    expect(divide(5, 2)).toBe(2.5);
  });

  test("throws an error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculate", () => {
  test.each([
    [2, "+", 3, 5],
    [10, "-", 4, 6],
    [45, "*", 2, 90],
    [20, "/", 5, 4],
  ])("calculate(%p, %p, %p) = %p", (a, operator, b, expected) => {
    expect(calculate(a, operator, b)).toBe(expected);
  });

  test("supports 'x' as an alias for multiplication", () => {
    expect(calculate(6, "x", 7)).toBe(42);
  });

  test("throws for an unsupported operator", () => {
    expect(() => calculate(1, "%", 2)).toThrow(/Unsupported operator/);
  });

  test("propagates the division-by-zero error", () => {
    expect(() => calculate(10, "/", 0)).toThrow("Division by zero is not allowed.");
  });
});
