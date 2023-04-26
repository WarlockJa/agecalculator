import getDaysInAMonth from "./getDaysInAMonth"

interface IGetDatesDifference {
    year: number;
    month: number;
    day: number;
    currentDate: Date;
}

// calculating resulting differences between dates
const getDatesDifferences = (props: IGetDatesDifference) => {
    const { year, month, day, currentDate } = props
    // calculating difference between dates for year, month, and day
    // validated year always will be less or equal to current year
    // making adjustments for the fact that it went from 1BC to 1AD skipping year 0
    let resultYear = year < 0 ? currentDate.getFullYear() - year - 1 : currentDate.getFullYear() - year

    // calculating resulting month difference
    let resultMonth = currentDate.getMonth() - month
    // adding a year worth in months to a negative months difference and removing a year from a resulting year to compensate
    if (resultMonth < 0) {
      resultMonth += 11
      resultYear -= 1
    }

    // calculating days difference
    let resultDay = currentDate.getDate() - day
    if (resultDay < 0) {
      const previousMonth = month - 1 < 0 ? 11 : month - 1
      // calculating amount of days in a prior month that will be added to calculate days difference
      // leap year is calculated for a given year because the only month that can have different year, due to month shift, is December
      const daysInAPreviousMonth = getDaysInAMonth(previousMonth, year)
      resultDay += daysInAPreviousMonth ? daysInAPreviousMonth : 0
      // changing months count to compensate for days difference
      resultMonth -= 1
      // verifying and changing years count if month switched to December
      if (resultMonth < 0) {
        resultMonth += 11
        resultYear -= 1
      }
    }
    
    return { resultDay, resultMonth, resultYear }
}

export default getDatesDifferences