import './App.css';
const Header = (props) => {
  return(
    <p>
      <h1>{props.course}</h1>
    </p>
    )
}
const Content = (props) => {
  return(
    <div>
      <p>
        {props.part1} <b><u>{props.exercises1}</u></b>
      </p>
      <p>
        {props.part2} <b><u>{props.exercises2}</u></b>
      </p>
      <p>
        {props.part3} <b><u>{props.exercises3}</u></b>
      </p>
    </div>
  )
}
const Part1 = (props) => {
  return(
    <div>
      <p>
        {props.part1} <b><u>{props.exercises1}</u></b>
      </p>
    </div>
  )
}
const Part2 = (props) => {
  return(
    <div>
      <p>
        {props.part2} <b><u>{props.exercises2}</u></b>
      </p>
    </div>
  )
}
const Part3 = (props) => {
  return(
    <div>
      <p>
      {props.part3} <b><u>{props.exercises3}</u></b>
      </p>
    </div>
  )
}

const Total = (props) => {
  return(
  <p>Number of exercises: <b><u>{props.total}</u></b></p>
  )
}

const App = () => {
  const course = 'Half Stack application development: '
  const part1 = 'Fundamentals of React: '
  const exercises1 = 10
  const part2 = 'Using props to pass data: '
  const exercises2 = 7
  const part3 = 'State of a component: '
  const exercises3 = 14
  
    return (
      <div>
        <Header course={course}/>
        <Content />

        <Part1 part1={part1} exercises1={exercises1} />       
        <Part2 part2={part2} exercises2={exercises2} />       
        <Part3 part3={part3} exercises3={exercises3}/>     

        <Total total={exercises1+exercises2+exercises3} />
      </div>
    )
}

export default App;
