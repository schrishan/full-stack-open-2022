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

const Total = ({ parts }) => {
    const sum = parts.reduce((total, obj) => {
        return total + obj.exercises;
    }, 0);
    return (
        <h4>total of {sum} exercises</h4>
    )
}




const Course = (props) => {
    return (
        props.course.map((course, index) =>
            <div key={index}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>)
    )
}

export default Course