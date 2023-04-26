// calculating number of days in a month
const getDaysInAMonth = (month: number, year: number) => {
    let result: number | undefined
    switch (month) {
      // Jan, Mar, May, Jul, Aug, Oct, Dec
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        result = 31
        break;
      // Apr, Jun, Sep, Nov
      case 3:
      case 5:
      case 8:
      case 10:
        result = 30
        break;
      // Feb
      case 1:
        // calculating if leap year
        // Leap year if divisible by 4. Not a leap year if divisible by 100. But again leap year if divisible by 400.
        year % 4 === 0
          ? year % 100 === 0
            ? year % 400 === 0
              ? result = 29
              : result = 28
            : result = 29
          : result = 28
        break;
      default:
        result = undefined
        break;
    }
    return result
}

export default getDaysInAMonth