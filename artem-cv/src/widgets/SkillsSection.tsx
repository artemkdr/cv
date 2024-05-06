import React from 'react';

const SkillsSection = ({title, items} : {
    title: string,
    items: any[]
}) => {

    let itemConverter = (item: any) => {
        if (typeof item === 'string') {
            return item;
        } else if (typeof item === 'object' && item.url !== undefined) {
            return <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>;
        }
        return item;
    };

    return (
        <div className='skills'>
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{itemConverter(item)}</li>
                ))}
            </ul>
        </div>
    );
}

export default SkillsSection;