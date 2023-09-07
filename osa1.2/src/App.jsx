import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const positiveClicks = props.good
  const neutralClicks = props.neutral
  const negativeClicks = props.bad
  const allClicks = props.allClicks

  if(positiveClicks === 0 && neutralClicks === 0 && negativeClicks === 0 && allClicks === 0){
    return (
      <p>No feedback given</p>
    )
  }

  return(
    <>
      <p>Good {positiveClicks}</p>
      <p>Neutral {neutralClicks}</p>
      <p>Bad {negativeClicks}</p>
      <p>All {allClicks}</p>
      <CalculateAverage allClicks={allClicks} good={positiveClicks} bad={negativeClicks}/>
      <CalculatePositive good={positiveClicks} allClicks={allClicks} />
    </>
  )
}

const CalculatePositive = (props) => {
  const positive = props.good
  const allClicks = props.allClicks

  const result = positive/allClicks * 100

  if(allClicks <= 0){
    return <p>Positive %</p>
  }

  return(
    <p>Positive {result} %</p>
  )
}

const CalculateAverage = (props) => {
  const allClicks = props.allClicks
  const good = props.good
  const bad = props.bad

  if (allClicks === 0) {
    return(
      <p>Average </p>
    )
  }
  const scoreSum = good - bad;
  const result = scoreSum/allClicks
  return(
    <p>Average {result}</p> 
  )
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics allClicks={allClicks} neutral={neutral} good={good} bad={bad}/>
    </div>
  )
}

export default App