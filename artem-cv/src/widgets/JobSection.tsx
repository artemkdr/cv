import React from 'react';

const JobSection = (job : any) => {
    job = job.job;
    let title = job["Title"];
    let company = job["Company"];
    let period = job["Period"];
    let duties = job["Duties"];
    let projectTitle = job["ProjectTitle"];
    let projects = job["Projects"];
    return (
        <div className='job'>
            <h2>{title}</h2>
            
            <div className="line">
                <div className="subsection">{company}</div>
                <div className="period">{period}</div>
            </div>
            {duties && <ul>
                {duties.map((item : string, index : number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>}
            {projectTitle && <div className="subsection full m10">{projectTitle}</div>}
            {projects && <ul>
                {projects.map((item : string, index : number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>}
        </div>
    );
}

export default JobSection;