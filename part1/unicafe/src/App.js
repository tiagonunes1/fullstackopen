import React,{ useState } from 'react'

const Header = () =>{
  return(
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = ({click, text}) => {
  return(
  <button onClick={click}>{text}</button>
  )
}

const Stats = ({good,neutral,bad}) =>{
  let perc = ''
  
  if (feedback === 'positive') perc ='%'
  if (feedback !== 'positive') perc =''
  
  const all = good + neutral + bad
  const positive = ( good / all ) * 100 
  const average = good * 1 + neutral * 0 + bad * -1
  if (good > 0 || neutral > 0 || bad > 0) {
  return (
      <div>
        <h2>
          statistics
        </h2>
      <Result count={good} feedback="good" />
      <Result count={neutral} feedback="neutral" />
      <Result count={bad} feedback="bad" />
      <Result count={all} feedback="all" />
      <Result count={average} feedback="average" />
      <Result count={positive} feedback="positive" />
      </div>
    )
  }
  return(
    <p>No feedback yet.</p>
  )
}

const Result = ({feedback, value}) =>{
  return [
  <p>{feedback}: {count}</p>
  ]
}


function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    
  }

  return (
    <div>
    <Header />
    <Button text="good" click={handleGood}/>
    <Button text="neutral" click={handleNeutral}/>
    <Button text="bad" click={handleBad}/>
    <Stats good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App;
