import './App.css';
import Course from './components/Course'
import Header from './components/Header'
import Content from './components/Content'
import Part from './components/Part'

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
      ],
    },
  ];

   const tit = courses.filter(function(courses){
     return courses.name === 'Half Stack application development'
   })
   const titulo = tit[0].name

   const usersByLikes = courses.map(item => {
    const container = {};
  
    container[item.name] = item.id;
    //container.age = item.name.length * 10;
  
    return container;
  })
  console.log(usersByLikes)
  
  // const title = Object.values(course).filter(course => course.name === 'Half Stack application development')


  return (
    <div>
      <Course title={titulo} courses={courses.map(name => <li key={name}> {name} </li>)} />
    </div>
  )
}



export default App;