// transforming number into a string description
// e.g. "3" === "days", "1" === "day"
// number - is the date number, value - type of the number (days, months, years)

const getDateDescriptionFromNumber = ({
  number,
  value,
}: {
  number: number;
  value: "days" | "months" | "years";
}) => {
  const numberAsString = number.toString();
  const numbersLength = numberAsString.length;
  const result = value.concat(
    numbersLength > 1
      ? // number is more than 1 digit
        numberAsString[numbersLength - 2] === "1"
        ? // number ends with 1*
          "_5-9"
        : // number does not end with 1*
        numberAsString[numbersLength - 1] === "1"
        ? // number ends with 1
          ""
        : Number(numberAsString[numbersLength - 1]) <= 4
        ? // the last digit is between 2-4
          "_2-4"
        : "_5-9"
      : // number is one digit
      number === 1
      ? // number is 1
        ""
      : number <= 4
      ? // number is between 2-4
        "_2-4"
      : "_5-9"
  );

  return result;
};

export default getDateDescriptionFromNumber;
