import React from 'react'
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} you are {props.age} years old</p>
    </div>
  )
}
const App = () => {
  const name = 'João'
  const age = 26
  return( 
    <div>
      <h1>Greetings</h1>
      <Hello name="Tiago" age={new Date().getFullYear()-1995} />
      <Hello name={name} age={age} />
    </div>
  )
}
export default App