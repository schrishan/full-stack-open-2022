import { useState } from 'react'


const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => <div>{name} {exercises}</div>

const Content = ({ parts }) => {
   return (
        parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
    )
}

const Course = (props) => {
    return (
        <>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
        </>
    )
}

export default Course