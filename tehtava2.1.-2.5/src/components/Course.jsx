const Course = ({ course }) => {
    //Destruktointi
    const halfStack = course[0].parts
    const nodeJs = course[1].parts

    //Reduce esimerkkikäyttö
    const totalAmountHalfStack = halfStack.reduce((sum, course) => {
        return sum + course.exercises
    }, 0)

    //Reduce esimerkkikäyttö
    const totalAmountNodeJs = nodeJs.reduce((sum, course) => {
        return sum + course.exercises
    }, 0)

    return (
    <div>
      <h1>{course[0].name}</h1>
      {halfStack.map((course, id) => <p key={id}>{course.name + " " + course.exercises}</p>)}
      <p style={{fontWeight: "bold"}}>Total of {totalAmountHalfStack} exercises</p>
      <h1>{course[1].name}</h1>
      {nodeJs.map((course, id) => <p key={id}>{course.name + " " + course.exercises}</p>)}
      <p style={{fontWeight: "bold"}}>Total of {totalAmountNodeJs} exercises</p>
    </div>
    )
}


export default Course