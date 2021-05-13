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

const Stats = () =>{
  return (
    <div>
      <h2>
        statistics
      </h2>
    </div>
  )
}

const Result = ({feedback, count}) =>{
  let perc = ''

  if (feedback === 'positive') perc ='%'
  if (feedback !== 'positive') perc =''

  return [
  <p>{feedback}: {count}{perc}</p>
  ]
}


function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setAll(allClicks + 1 )
    setGood(good + 1)
    setPositive(positive + 1)
    setPositive((positive/allClicks)*100)
    console.log(allClicks)
    console.log(positive)
  }
  const handleNeutral = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
    
  }
  const handlePositive = () => {
    setPositive(positive / allClicks * 100)
  }

  return (
    <div>
    <Header />
    <Button text="good" click={handleGood}/>
    <Button text="neutral" click={handleNeutral}/>
    <Button text="bad" click={handleBad}/>
    <Stats />
    <Result feedback="good" count={good}/>
    <Result feedback="neutral" count={neutral}/>
    <Result feedback="bad" count={bad}/>
    <Result feedback="all" count={allClicks}/>
    <Result feedback="average"/>
    <Result feedback="positive" count={positive}/>

    </div>
  )
}

export default App;
