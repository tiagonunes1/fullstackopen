import React from 'react'

const Course = ({ course }) => {
    return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </div>
      )
}

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts }) => {
 return(
  <div>
  {parts.map((cont) => (
    <Part key={cont.id} cont={cont}/>
  ))}
  </div>
 )
}

const Part = ({ cont }) =>{
  return (
  <p>{cont.name}: {cont.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const soma = parts.reduce((total, valor) => total + valor.exercises,0);
  return(
    <p><strong>total of <u>{soma}</u> exercises </strong></p>
  )
}

export default Course
