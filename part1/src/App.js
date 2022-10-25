import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <div>{props.text} {props.value}</div>
)

const Statistics = (props) => {
  if (props.total !== 0) 
    return (
      <>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <div>total {props.total}</div>
        <div>average {props.positive / props.total}</div>
        <div>positive {(props.good / props.total)*100} %</div>
        </>
    )
    return (
      <div>No feedback given</div>
    )
  }

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positive , setPositive] = useState(0);

  const setToGood = () => {
    setGood(good + 1);
    setPositive(positive + 1);
    setTotal(total + 1);
  };
  const setToNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const setToBad = () => {
    setBad(bad + 1);
    setPositive(positive - 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral"/>
      <Button handleClick={setToBad} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} positive={positive} />
    </div>
  )
}

export default App