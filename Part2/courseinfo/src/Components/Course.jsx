const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
  
    return (
      <div>
        <h1>{course.name}</h1>
        {course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        <p>Total of {total} exercises</p>
      </div>
    )
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

export default Course