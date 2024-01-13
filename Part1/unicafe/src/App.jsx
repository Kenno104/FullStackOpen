import { useState } from 'react'

// Components
const Button = ({ onClick, text }) => 
    <button onClick={onClick}>
      {text}
    </button>

const Stat = ({ title, value }) => {
    return (
      <p>{title} <Fig title={title} value={value} /></p>
    )
}

const Fig = ({ title, value }) => {
  if (title === 'Positive') {
      return (
        <p>{value}%</p>
      )
    }
  return (
    <p>{value}</p>
  )
}

const Buttons = ({ increaseGoodByOne, increaseNeutralByOne, increaseBadByOne }) => {
  return (
    <div>
        <Button onClick={increaseGoodByOne} text='Good' />
        <Button onClick={increaseNeutralByOne} text='Neutral' />
        <Button onClick={increaseBadByOne} text='Bad' />
      </div>
  )
}

const Statistics = ({ total, good, neutral, bad, average, positive }) => {
  console.log(`total = ${total}`)
  if (total > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td><Fig title='Good' value={total} /></td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td><Fig title='Neutral' value={total} /></td>
            </tr>
            <tr>
              <td>Bad</td>
              <td><Fig title='Bad' value={total} /></td>
            </tr>
            <tr>
              <td>Total</td>
              <td><Fig title='Total' value={total} /></td>
            </tr>
            <tr>
              <td>Average</td>
              <td><Fig title='Average' value={average} /></td>
            </tr>
            <tr>
              <td>Positive</td>
              <td><Fig title='Positive' value={positive} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGoodByOne = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1

    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(updatedGood - bad / updatedTotal)
    setPositive(updatedGood / updatedTotal * 100)
  }
  const increaseNeutralByOne = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1

    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(good - bad / updatedTotal)
    setPositive(good / updatedTotal * 100)
  }
  const increaseBadByOne = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(good - updatedBad / updatedTotal)
    setPositive(good / updatedTotal * 100)
  }
  
  return (
    <div>
      <h1>Give Feedack Here</h1>
      <Buttons increaseGoodByOne={increaseGoodByOne} increaseNeutralByOne={increaseNeutralByOne} increaseBadByOne={increaseBadByOne} />
      <br />

      <h1>Statistics</h1>
      <Statistics total={total} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

export default App