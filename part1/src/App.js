import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => setGood(good + 1);
  const setToNeutral = () => setNeutral(neutral + 1);
  const setToBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral"/>
      <Button handleClick={setToBad} text="bad"/>

      <h2>statistics</h2>

      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App