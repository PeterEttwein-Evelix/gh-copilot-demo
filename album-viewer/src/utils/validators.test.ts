import { describe, it, expect } from 'vitest';
import { validateDate } from './validators';

describe("validateDate", () => {
  it("should return a date object when given a valid date string", () => {
    const date = "01/01/2019";
    const expectedDate = new Date(2019, 0, 1);
    expect(validateDate(date)).to.deep.equal(expectedDate);
  });

  it("should throw an error when given an invalid date string", () => {
    const date = "invalid-date";
    expect(() => validateDate(date)).to.throw();
  });

  it("should return a Date instance", () => {
    expect(validateDate("2024-06-15")).toBeInstanceOf(Date);
  });

  it("should correctly parse an ISO 8601 date string", () => {
    const result = validateDate("2024-06-15");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June is 0-indexed
    expect(result.getDate()).toBe(15);
  });

  it("should throw on an empty string", () => {
    expect(() => validateDate("")).to.throw();
  });

  it("should throw on a numeric-only string that is not a date", () => {
    expect(() => validateDate("99999999999999999999")).to.throw();
  });

  it("should throw on undefined-like string input", () => {
    expect(() => validateDate("undefined")).to.throw();
  });

  it("should handle leap day 29th February on a leap year", () => {
    const result = validateDate("2024-02-29");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(29);
  });

  it("should throw on 29th February in a non-leap year", () => {
    expect(() => validateDate("2023-02-29")).to.throw();
  });
});
