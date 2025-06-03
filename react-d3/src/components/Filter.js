import React from 'react';

const Filter = ({ageGroups, selectedAgeGroup, setSelectedAgeGroup}) => {
    return (
        <div className='filter-container'>
            <label htmlFor='age-group'>Select Age Group:</label>
            <select
                id='age-group'
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
            >
            <option value="">All</option>
            {ageGroups.map((age) => (
                <option key={age} value={age}>{age}</option>
            ))}
            </select>
        </div>
    )
}

export default Filter