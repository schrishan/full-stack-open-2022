import { useState } from 'react'

const Filter = (props) => {
    const handleFilterNameChange = (event) => {
        
        if (props.filterName === '') {
            props.setShowAll(true)
        } else {
            props.setShowAll(false)
        }
        props.setFilterName(event.target.value)
    }
    return (
        <div>
            filter shown with<input value={props.filterName} onChange={handleFilterNameChange} />
        </div>
    )
}

export default Filter;