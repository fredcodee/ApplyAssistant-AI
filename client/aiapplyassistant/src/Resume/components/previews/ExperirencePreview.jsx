import React from 'react'

const ExperirencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='text-sm flex justify-between' style={{color:resumeInfo?.themeColor}}>{experience?.companyName}, 
                ({experience?.type})
                <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
                </h2>
                <div>
                    <ul>
                        {experience?.workSummary?.map((summary,index)=>(
                            <li key={index} className='text-xs'
                            >{summary}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ExperirencePreview