// Component
const Collection = ({ courses }) => {
  const collection = courses.map(course => <Course key={course.id} course={course} />)
  return (
    <>
     {collection}
     </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Part parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Part = ({ parts }) => {
  return (
    parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
  <Collection courses={courses} />
  </>
  )
}

export default App