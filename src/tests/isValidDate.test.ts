import isValidDate from "../util/isValidDate";

test("January 1st 2022", () => {
  const year = 2022;
  const month = 1;
  const day = 1;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "",
  });
});

test("Year 0 check", () => {
  const year = 0;
  const month = 1;
  const day = 1;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "There was no year 0",
  });
});

test("Year not in the past", () => {
  const year = 2022;
  const month = 1;
  const day = 1;
  const currentDate = new Date(1000);
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "Must be in the past",
  });
});

test("Inputs are empty", () => {
  const year = undefined;
  const month = undefined;
  const day = undefined;
  const currentDate = new Date();
  expect(
    // @ts-expect-error testing wrong argument type
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "This field is required",
    invalidMonthMessage: "This field is required",
    invalidYearMessage: "This field is required",
  });
});

test("Year is -", () => {
  const year = "-";
  const month = 1;
  const day = 1;
  const currentDate = new Date();
  expect(
    // @ts-expect-error testing wrong argument type
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "This field is required",
  });
});

test("Day is 0", () => {
  const year = 2000;
  const month = 1;
  const day = 0;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid day",
    invalidMonthMessage: "",
    invalidYearMessage: "",
  });
});

test("Day is 32", () => {
  const year = 2000;
  const month = 1;
  const day = 0;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid day",
    invalidMonthMessage: "",
    invalidYearMessage: "",
  });
});

test("Year between 1-99", () => {
  const year = 50;
  const month = 1;
  const day = 1;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "",
  });
});

test("February 29 on a non-leap year", () => {
  const year = 1999;
  const month = 1;
  const day = 29;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid date",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});

test("April 31", () => {
  const year = 1999;
  const month = 3;
  const day = 31;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid date",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});

test("June 31", () => {
  const year = 1999;
  const month = 5;
  const day = 31;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid date",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});

test("September 31", () => {
  const year = 1999;
  const month = 8;
  const day = 31;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid date",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});

test("November 31", () => {
  const year = 1999;
  const month = 10;
  const day = 31;
  const currentDate = new Date();
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be a valid date",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});

test("Date is not in the future", () => {
  const year = 1000;
  const month = 10;
  const day = 29;
  const currentDate = new Date(1000, 1, 1);
  expect(
    isValidDate({ year, month, day, currentDate, test: true })
  ).toStrictEqual({
    invalidDayMessage: "Must be in the past",
    invalidMonthMessage: " ",
    invalidYearMessage: " ",
  });
});
