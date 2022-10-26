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

const Total = ({ total }) => <h4>total of {total} exercises</h4>

const Course = (props) => {
    let t=0; 
    const total = props.course.parts.reduce(function (s, p) {
        t+=p.exercises
        return t
    })
    return (
        <>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total total={total} />
        </>
    )
}

export default Course