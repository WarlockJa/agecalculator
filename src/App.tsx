import './App.css'
import ButtonSVG from '../assets/images/icon-arrow.svg'
import { useEffect, useState } from 'react'
import getDatesDifferences from './util/getDatesDifference';
import isValidDate from './util/isValidDate';

interface IResultAgeDifferenceObj {
  resultDay: number;
  resultMonth: number;
  resultYear: number;
}

function App() {
  // input data states
  const [ageDay, setAgeDay] = useState('')
  const [ageMonth, setAgeMonth] = useState('')
  const [ageYear, setAgeYear] = useState('')
  // input invalid messages states
  const [invalidInputMessages, setInvalidInputMessages] = useState({ invalidDayMessage: '', invalidMonthMessage: '', invalidYearMessage: '' })
  // result data state
  const [resultAgeDifference, setResultAgeDifference] = useState<IResultAgeDifferenceObj>({ resultDay: 0, resultMonth: 0, resultYear: 0 })
  // new result data for animation
  const [newResultAgeDifference, setNewResultAgeDifference] = useState<IResultAgeDifferenceObj>({ resultDay: 0, resultMonth: 0, resultYear: 0 })
  const [animationTrigger, setAnimationTrigger] = useState(false)

  // date validation and form submit
  const handleAgeCalculatorFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // converting types
    const day = parseInt(ageDay)
    const month = parseInt(ageMonth) - 1 // Date() takes months 0-11
    const year = parseInt(ageYear)

    // current date snapshot
    const currentDate = new Date()
    
    // checking that assembled date is valid
    const { invalidDayMessage, invalidMonthMessage, invalidYearMessage } = isValidDate({ year, month, day, currentDate })
    setInvalidInputMessages({ invalidDayMessage, invalidMonthMessage, invalidYearMessage })
    if(!invalidDayMessage && !invalidMonthMessage && !invalidYearMessage) {
      // code splitting validation from difference calculation
      const { resultDay, resultMonth, resultYear } = getDatesDifferences({ year, month, day, currentDate })
      // saving new result for animation goal
      setNewResultAgeDifference({ resultDay, resultMonth, resultYear })
      setAnimationTrigger(prev => !prev)
    }
  }

  // result change animation
  useEffect(() => {
    const interval = setInterval(() => {
      let animatedResultDay = resultAgeDifference.resultDay
      let animatedResultMonth = resultAgeDifference.resultMonth
      let animatedResultYear = resultAgeDifference.resultYear

      // animating day counter
      if (animatedResultDay < newResultAgeDifference.resultDay) {
        animatedResultDay += 1
      } else if (animatedResultDay > newResultAgeDifference.resultDay) {
        animatedResultDay -= 1
      }
      // animating month counter
      if (animatedResultMonth < newResultAgeDifference.resultMonth) {
        animatedResultMonth += 1
      } else if (animatedResultMonth > newResultAgeDifference.resultMonth) {
        animatedResultMonth -= 1
      }
      // animating year counter
      if (animatedResultYear < newResultAgeDifference.resultYear) {
        animatedResultYear += 1
      } else if (animatedResultYear > newResultAgeDifference.resultYear) {
        animatedResultYear -= 1
      }

      setResultAgeDifference({ resultDay: animatedResultDay, resultMonth: animatedResultMonth, resultYear: animatedResultYear })
    }, 10);

    return () => clearInterval(interval);

  },[resultAgeDifference.resultDay, resultAgeDifference.resultMonth, resultAgeDifference.resultYear, animationTrigger])

  return (
    <main className='ageCalculator'>
      <form className='ageCalculator__inputForm' onSubmit={(e) => handleAgeCalculatorFormSubmit(e)}>
        
        <div className='inputForm__formWrapper'>

          <div className='formWrapper__inputBlock'>
            <label
              className={('formWrapper__inputBlock--label').concat(!invalidInputMessages.invalidDayMessage ? '' : ' invalid-font')}
              htmlFor="formWrapper__inputBlock--day"
            >day</label>
            <input
              id='formWrapper__inputBlock--day'
              className={('formWrapper__inputBlock--input').concat(!invalidInputMessages.invalidDayMessage ? '' : ' invalid-border')}
              maxLength={2}
              pattern='[0-9]*'
              value={ageDay}
              onChange={(e) => setAgeDay(e.target.validity.valid ? e.target.value : ageDay)}
              placeholder='DD'
            />
            {invalidInputMessages.invalidDayMessage && <p className='formWrapper__inputBlock--invalidMessage'>{invalidInputMessages.invalidDayMessage}</p>}
          </div>
          
          <div className='formWrapper__inputBlock'>
            <label
              className={('formWrapper__inputBlock--label').concat(!invalidInputMessages.invalidMonthMessage ? '' : ' invalid-font')}
              htmlFor="formWrapper__inputBlock--month"
            >month</label>
            <input
              id='formWrapper__inputBlock--month'
              className={('formWrapper__inputBlock--input').concat(!invalidInputMessages.invalidMonthMessage ? '' : ' invalid-border')}
              maxLength={2}
              pattern='[0-9]*'
              value={ageMonth}
              onChange={(e) => setAgeMonth(e.target.validity.valid ? e.target.value : ageMonth)}
              placeholder='MM'
            />
            {invalidInputMessages.invalidMonthMessage && <p className='formWrapper__inputBlock--invalidMessage'>{invalidInputMessages.invalidMonthMessage}</p>}
          </div>
          
          <div className='formWrapper__inputBlock formWrapper__inputBlock--year'>
            <label
              className={('formWrapper__inputBlock--label').concat(!invalidInputMessages.invalidYearMessage ? '' : ' invalid-font')}
              htmlFor="formWrapper__inputBlock--year"
            >year</label>
            <input
              id='formWrapper__inputBlock--year'
              className={('formWrapper__inputBlock--input formWrapper__inputBlock--inputYear').concat(!invalidInputMessages.invalidYearMessage ? '' : ' invalid-border')}
              maxLength={5}
              pattern='^-?\d*'
              value={ageYear}
              onChange={(e) => setAgeYear(e.target.validity.valid ? e.target.value : ageYear)}
              placeholder='YYYY'
            />
            {invalidInputMessages.invalidYearMessage ? <p className='formWrapper__inputBlock--invalidMessage'>{invalidInputMessages.invalidYearMessage}</p> : <p  className='formWrapper__inputBlock--invalidMessage'>&nbsp;</p>}
          </div>

        </div>
        
        <div className='ageCalculator__inputForm--submitWrapper'>
          <button className='ageCalculator__inputForm--submitButton'>
            <img className='ageCalculator__inputForm--submitButtonImage' src={ButtonSVG} />
          </button>
        </div>

      </form>

      <section className='ageCalculator__result'>
        { resultAgeDifference.resultYear
          ? <p className='ageCalculator__result--p'><span>{resultAgeDifference.resultYear}</span>{
            resultAgeDifference.resultYear.toString()[resultAgeDifference.resultYear.toString().length - 1] === '1'
            && resultAgeDifference.resultYear?.toString()[resultAgeDifference.resultYear.toString().length - 2] !== '1'
              ? ' year'
              : ' years'
          }</p>
          : <div className='ageCalculator__result--emptyPlug'>
            <div></div>
            <div></div>
            <p className='ageCalculator__result--p'>years</p>
          </div>
        }
        { resultAgeDifference.resultMonth
          ? <p className='ageCalculator__result--p'><span>{resultAgeDifference.resultMonth}</span>{
            resultAgeDifference.resultMonth === 1
              ? ' month'
              : ' months'
            }</p>
          : <div className='ageCalculator__result--emptyPlug'>
            <div></div>
            <div></div>
            <p className='ageCalculator__result--p'>months</p>
          </div>
        }
        { resultAgeDifference.resultDay
          ? <p className='ageCalculator__result--p'><span>{resultAgeDifference.resultDay}</span>{
            resultAgeDifference.resultDay.toString()[resultAgeDifference.resultDay.toString().length - 1] === '1'
              && resultAgeDifference.resultDay !== 11
                ? ' day'
                : ' days'
            }</p>
          : <div className='ageCalculator__result--emptyPlug'>
            <div></div>
            <div></div>
            <p className='ageCalculator__result--p'>days</p>
          </div>
        }
      </section>

    </main>
  )
}

export default App
