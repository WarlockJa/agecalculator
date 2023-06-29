interface IIsValidDate {
  year: number;
  month: number;
  day: number;
  currentDate: Date;
  t?: (value: string) => string;
  test?: boolean;
}

const isValidDate = (props: IIsValidDate) => {
  const { year, month, day, currentDate, t, test } = props;
  // input field error messages
  let invalidDayMessage = "";
  let invalidMonthMessage = "";
  let invalidYearMessage = "";
  // validated date
  const validatedDate = new Date(year, month, day);

  // validating individual fields to generate precise errors
  // validating year
  if (!isNaN(year)) {
    // TIL there was no year zero. It went from 1BC to 1AD
    if (year === 0) {
      invalidYearMessage =
        test || !t ? "There was no year 0" : t("error_year0");
    }
    // specific validation for a year field to be in the past as shown in the task conditions
    if (currentDate.getFullYear() < year) {
      invalidYearMessage =
        test || !t ? "Must be in the past" : t("error_notInPast");
    }
  } else {
    invalidYearMessage =
      test || !t ? "This field is required" : t("error_fieldRequired");
  }

  // validating month
  if (!isNaN(month)) {
    if (month < 0 || month > 11) {
      invalidMonthMessage =
        test || !t ? "Must be a valid month" : t("error_invalidMonth");
    }
  } else {
    invalidMonthMessage =
      test || !t ? "This field is required" : t("error_fieldRequired");
  }

  // validating day
  if (!isNaN(day)) {
    if (day > 31 || day < 1) {
      invalidDayMessage =
        test || !t ? "Must be a valid day" : t("error_invalidDay");
    }
  } else {
    invalidDayMessage =
      test || !t ? "This field is required" : t("error_fieldRequired");
  }

  // validating date as a whole
  if (!invalidDayMessage && !invalidMonthMessage && !invalidYearMessage) {
    // validating date for possible inconsistencies with the calendar such as leap days
    // Workaround JS adding 1900 to two digit year when converting using new Date(YY, MM, DD)
    const actualYear = year >= 0 && year <= 99 ? year + 1900 : year;
    if (
      validatedDate.getFullYear() !== actualYear ||
      validatedDate.getMonth() !== month ||
      validatedDate.getDate() !== day
    ) {
      invalidYearMessage = " ";
      invalidMonthMessage = " ";
      invalidDayMessage =
        test || !t ? "Must be a valid date" : t("error_invalidDate");
    }
    // validating that validatedDate is in the past
    else if (currentDate.getTime() - validatedDate.getTime() < 0) {
      invalidYearMessage = " ";
      invalidMonthMessage = " ";
      invalidDayMessage =
        test || !t ? "Must be in the past" : t("error_notInPast");
    }
  }

  return { invalidDayMessage, invalidMonthMessage, invalidYearMessage };
};

export default isValidDate;
