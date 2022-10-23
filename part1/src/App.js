const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) =>{
  return (
  <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {

  const parts = props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  let totalValue = 0;
  props.parts.map(part => totalValue += part.exercises)
  return(
    <div>
      <p>Number of exercises {totalValue}</p>
    </div>
  )
}

const App=() =>{
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return(
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App;
