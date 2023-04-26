import getDatesDifferences from "../util/getDatesDifference";

test('Date is equal current date', () => {
    const year = 1000;
    const month = 1;
    const day = 1;
    const currentDate = new Date(1000, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 0,
        resultMonth: 0,
        resultYear: 0
    });
});

test("Past date months greater than current date's months", () => {
    const year = 2000;
    const month = 2;
    const day = 1;
    const currentDate = new Date(2001, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 0,
        resultMonth: 10,
        resultYear: 0
    });
});

test("Past date days greater than current date's days", () => {
    const year = 2000;
    const month = 1;
    const day = 10;
    const currentDate = new Date(2001, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 22,
        resultMonth: 10,
        resultYear: 0
    });
});

test("Past date days and months greater than current date's days and months. Past month is February on leap year", () => {
    const year = 2000;
    const month = 2;
    const day = 10;
    const currentDate = new Date(2001, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 20,
        resultMonth: 9,
        resultYear: 0
    });
});

test("Past date days and months greater than current date's days and months. Past month is February on non-leap year", () => {
    const year = 2001;
    const month = 2;
    const day = 10;
    const currentDate = new Date(2002, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 19,
        resultMonth: 9,
        resultYear: 0
    });
});

test("Year is negative", () => {
    const year = -1;
    const month = 1;
    const day = 1;
    const currentDate = new Date(2000, 1, 1);
    expect(getDatesDifferences({ year, month, day, currentDate })).toStrictEqual({
        resultDay: 0,
        resultMonth: 0,
        resultYear: 2000
    });
});