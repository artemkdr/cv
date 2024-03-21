import React from 'react';

const SkillsSection = ({title, items}) => {
    return (
        <div className='skills'>
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default SkillsSection;