import "./App.css";
import ButtonSVG from "../assets/images/icon-arrow.svg";
import { useEffect, useState } from "react";
import getDatesDifferences from "./util/getDatesDifference";
import isValidDate from "./util/isValidDate";
import { useTranslation } from "react-i18next";
import getDateDescriptionFromNumber from "./util/getDateDescriptionFromNumber";

interface IResultAgeDifferenceObj {
  resultDay: number;
  resultMonth: number;
  resultYear: number;
}

function App() {
  const { t } = useTranslation();
  // input data states
  const [ageDay, setAgeDay] = useState("");
  const [ageMonth, setAgeMonth] = useState("");
  const [ageYear, setAgeYear] = useState("");
  // input invalid messages states
  const [invalidInputMessages, setInvalidInputMessages] = useState({
    invalidDayMessage: "",
    invalidMonthMessage: "",
    invalidYearMessage: "",
  });
  // result data state
  const [resultAgeDifference, setResultAgeDifference] =
    useState<IResultAgeDifferenceObj>({
      resultDay: 0,
      resultMonth: 0,
      resultYear: 0,
    });
  // new result data for animation
  const [newResultAgeDifference, setNewResultAgeDifference] =
    useState<IResultAgeDifferenceObj>({
      resultDay: 0,
      resultMonth: 0,
      resultYear: 0,
    });
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // date validation and form submit
  const handleAgeCalculatorFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // converting types
    const day = parseInt(ageDay);
    const month = parseInt(ageMonth) - 1; // Date() takes months 0-11
    const year = parseInt(ageYear);

    // current date snapshot
    const currentDate = new Date();

    // checking that assembled date is valid
    const { invalidDayMessage, invalidMonthMessage, invalidYearMessage } =
      isValidDate({ year, month, day, currentDate, t });
    setInvalidInputMessages({
      invalidDayMessage,
      invalidMonthMessage,
      invalidYearMessage,
    });
    if (!invalidDayMessage && !invalidMonthMessage && !invalidYearMessage) {
      // code splitting validation from difference calculation
      const { resultDay, resultMonth, resultYear } = getDatesDifferences({
        year,
        month,
        day,
        currentDate,
      });
      // saving new result for animation goal
      setNewResultAgeDifference({ resultDay, resultMonth, resultYear });
      setAnimationTrigger((prev) => !prev);
    }
  };

  // result change animation
  useEffect(() => {
    const interval = setInterval(() => {
      let animatedResultDay = resultAgeDifference.resultDay;
      let animatedResultMonth = resultAgeDifference.resultMonth;
      let animatedResultYear = resultAgeDifference.resultYear;

      // animating day counter
      if (animatedResultDay < newResultAgeDifference.resultDay) {
        animatedResultDay += 1;
      } else if (animatedResultDay > newResultAgeDifference.resultDay) {
        animatedResultDay -= 1;
      }
      // animating month counter
      if (animatedResultMonth < newResultAgeDifference.resultMonth) {
        animatedResultMonth += 1;
      } else if (animatedResultMonth > newResultAgeDifference.resultMonth) {
        animatedResultMonth -= 1;
      }
      // animating year counter
      if (animatedResultYear < newResultAgeDifference.resultYear) {
        animatedResultYear += 1;
      } else if (animatedResultYear > newResultAgeDifference.resultYear) {
        animatedResultYear -= 1;
      }

      setResultAgeDifference({
        resultDay: animatedResultDay,
        resultMonth: animatedResultMonth,
        resultYear: animatedResultYear,
      });
    }, 10);

    return () => clearInterval(interval);
  }, [
    resultAgeDifference.resultDay,
    resultAgeDifference.resultMonth,
    resultAgeDifference.resultYear,
    animationTrigger,
  ]);

  return (
    <main className="ageCalculator">
      <form
        className="ageCalculator__inputForm"
        onSubmit={(e) => handleAgeCalculatorFormSubmit(e)}
      >
        <div className="inputForm__formWrapper">
          <div className="formWrapper__inputBlock">
            <label
              className={"formWrapper__inputBlock--label".concat(
                !invalidInputMessages.invalidDayMessage ? "" : " invalid-font"
              )}
              htmlFor="formWrapper__inputBlock--day"
            >
              {t("days")}
            </label>
            <input
              id="formWrapper__inputBlock--day"
              className={"formWrapper__inputBlock--input".concat(
                !invalidInputMessages.invalidDayMessage ? "" : " invalid-border"
              )}
              maxLength={2}
              pattern="[0-9]*"
              value={ageDay}
              onChange={(e) =>
                setAgeDay(e.target.validity.valid ? e.target.value : ageDay)
              }
              placeholder={t("placeholder_dd")}
            />
            {invalidInputMessages.invalidDayMessage && (
              <p className="formWrapper__inputBlock--invalidMessage">
                {invalidInputMessages.invalidDayMessage}
              </p>
            )}
          </div>

          <div className="formWrapper__inputBlock">
            <label
              className={"formWrapper__inputBlock--label".concat(
                !invalidInputMessages.invalidMonthMessage ? "" : " invalid-font"
              )}
              htmlFor="formWrapper__inputBlock--month"
            >
              {t("months")}
            </label>
            <input
              id="formWrapper__inputBlock--month"
              className={"formWrapper__inputBlock--input".concat(
                !invalidInputMessages.invalidMonthMessage
                  ? ""
                  : " invalid-border"
              )}
              maxLength={2}
              pattern="[0-9]*"
              value={ageMonth}
              onChange={(e) =>
                setAgeMonth(e.target.validity.valid ? e.target.value : ageMonth)
              }
              placeholder={t("placeholder_mm")}
            />
            {invalidInputMessages.invalidMonthMessage && (
              <p className="formWrapper__inputBlock--invalidMessage">
                {invalidInputMessages.invalidMonthMessage}
              </p>
            )}
          </div>

          <div className="formWrapper__inputBlock formWrapper__inputBlock--year">
            <label
              className={"formWrapper__inputBlock--label".concat(
                !invalidInputMessages.invalidYearMessage ? "" : " invalid-font"
              )}
              htmlFor="formWrapper__inputBlock--year"
            >
              {t("years")}
            </label>
            <input
              id="formWrapper__inputBlock--year"
              className={"formWrapper__inputBlock--input formWrapper__inputBlock--inputYear".concat(
                !invalidInputMessages.invalidYearMessage
                  ? ""
                  : " invalid-border"
              )}
              maxLength={5}
              pattern="^-?\d*"
              value={ageYear}
              onChange={(e) =>
                setAgeYear(e.target.validity.valid ? e.target.value : ageYear)
              }
              placeholder={t("placeholder_yyyy")}
            />
            {invalidInputMessages.invalidYearMessage ? (
              <p className="formWrapper__inputBlock--invalidMessage">
                {invalidInputMessages.invalidYearMessage}
              </p>
            ) : (
              <p className="formWrapper__inputBlock--invalidMessage">&nbsp;</p>
            )}
          </div>
        </div>

        <div className="ageCalculator__inputForm--submitWrapper">
          <button className="ageCalculator__inputForm--submitButton">
            <img
              className="ageCalculator__inputForm--submitButtonImage"
              src={ButtonSVG}
            />
          </button>
        </div>
      </form>

      <section className="ageCalculator__result">
        {resultAgeDifference.resultYear ? (
          <p className="ageCalculator__result--p">
            <span>{resultAgeDifference.resultYear}</span>
            &nbsp;
            {t(
              getDateDescriptionFromNumber({
                number: resultAgeDifference.resultYear,
                value: "years",
              })
            )}
          </p>
        ) : (
          <div className="ageCalculator__result--emptyPlug">
            <div></div>
            <div></div>
            <p className="ageCalculator__result--p">{t("years_5-9")}</p>
          </div>
        )}
        {resultAgeDifference.resultMonth ? (
          <p className="ageCalculator__result--p">
            <span>{resultAgeDifference.resultMonth}</span>
            &nbsp;
            {t(
              getDateDescriptionFromNumber({
                number: resultAgeDifference.resultMonth,
                value: "months",
              })
            )}
          </p>
        ) : (
          <div className="ageCalculator__result--emptyPlug">
            <div></div>
            <div></div>
            <p className="ageCalculator__result--p">{t("months_5-9")}</p>
          </div>
        )}
        {resultAgeDifference.resultDay ? (
          <p className="ageCalculator__result--p">
            <span>{resultAgeDifference.resultDay}</span>
            &nbsp;
            {t(
              getDateDescriptionFromNumber({
                number: resultAgeDifference.resultDay,
                value: "days",
              })
            )}
          </p>
        ) : (
          <div className="ageCalculator__result--emptyPlug">
            <div></div>
            <div></div>
            <p className="ageCalculator__result--p">{t("days_5-9")}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
