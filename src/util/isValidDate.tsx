interface IIsValidDate {
    year: number;
    month: number;
    day: number;
    currentDate: Date;
}

const isValidDate = (props: IIsValidDate) => {
    const { year, month, day, currentDate } = props
    // input field error messages
    let invalidDayMessage = ''
    let invalidMonthMessage = ''
    let invalidYearMessage = ''
    // validated date
    const validatedDate = new Date(year, month, day)
    
    // validating individual fields to generate precise errors
    // validating year
    if (!isNaN(year)) {
        // TIL there was no year zero. It went from 1BC to 1AD
        if(year === 0) {
            invalidYearMessage = 'There was no year 0'
        }
        // specific validation for a year field to be in the past as shown in the task conditions
        if (currentDate.getFullYear() < year)
        {
            invalidYearMessage = 'Must be in the past'
        }
    } else {
        invalidYearMessage = 'This field is required'
    }
    
    // validating month
    if (!isNaN(month)) {
        if (month < 0 || month > 11) {
            invalidMonthMessage = 'Must be a valid month'
        }
    } else {
        invalidMonthMessage = 'This field is required'
    }
    
    // validating day
    if (!isNaN(day)) {
        if (day > 31 || day < 1) {
            invalidDayMessage = 'Must be a valid day'
        }
    } else {
        invalidDayMessage = 'This field is required'
    }

    // validating date as a whole
    if(!invalidDayMessage && !invalidMonthMessage && !invalidYearMessage) {
        // validating date for possible inconsistencies with the calendar such as leap days
        // Workaround JS adding 1900 to two digit year when converting using new Date(YY, MM, DD)
        const actualYear = (year >= 0 && year <= 99) ? year + 1900 : year
        if(validatedDate.getFullYear() !== actualYear || validatedDate.getMonth() !== month || validatedDate.getDate() !== day) {
            invalidYearMessage = ' '
            invalidMonthMessage = ' '
            invalidDayMessage = 'Must be a valid date'
        } 
        // validating that validatedDate is in the past
        else if (currentDate.getTime() - validatedDate.getTime() < 0) {
            invalidYearMessage = ' '
            invalidMonthMessage = ' '
            invalidDayMessage = 'Must be in the past'
        }
    }

    return { invalidDayMessage, invalidMonthMessage, invalidYearMessage }
}

export default isValidDate