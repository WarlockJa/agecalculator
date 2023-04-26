import getDaysInAMonth from "../util/getDaysInAMonth";

test('January', () => {
    expect(getDaysInAMonth(0,1)).toBe(31);
});
test('February non-leap year', () => {
    expect(getDaysInAMonth(1,1)).toBe(28);
});
test('February leap year 4', () => {
    expect(getDaysInAMonth(1,4)).toBe(29);
});
test('February non-leap year 100', () => {
    expect(getDaysInAMonth(1,100)).toBe(28);
});
test('February leap year -400', () => {
    expect(getDaysInAMonth(1,-400)).toBe(29);
});
test('March', () => {
    expect(getDaysInAMonth(2,1)).toBe(31);
});
test('April', () => {
    expect(getDaysInAMonth(3,1)).toBe(30);
});
test('May', () => {
    expect(getDaysInAMonth(4,1)).toBe(31);
});
test('June', () => {
    expect(getDaysInAMonth(5,1)).toBe(30);
});
test('July', () => {
    expect(getDaysInAMonth(6,1)).toBe(31);
});
test('August', () => {
    expect(getDaysInAMonth(7,1)).toBe(31);
});
test('September', () => {
    expect(getDaysInAMonth(8,1)).toBe(30);
});
test('October', () => {
    expect(getDaysInAMonth(9,1)).toBe(31);
});
test('November', () => {
    expect(getDaysInAMonth(10,1)).toBe(30);
});
test('December', () => {
    expect(getDaysInAMonth(11,1)).toBe(31);
});
test('Improper data', () => {
    expect(getDaysInAMonth(12,0)).toBe(undefined);
});