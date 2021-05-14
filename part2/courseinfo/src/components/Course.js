import React from 'react'

const Course = ({ courses,title }) => {
    return (
    <div>
      <h1>{title}</h1>
       {courses}
      </div>
      )
}

export default Course
