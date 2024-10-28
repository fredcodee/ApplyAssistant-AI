import React from 'react'

const SkillsPreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Technical Skills</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className='grid grid-cols-2 gap-2 my-4'>
        {resumeInfo?.skills.map((skill, index)=>(
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs'>{skill.name}</h2>
            </div>
        ))}
        <div className='flex items-center justify-between'>
                <h2 className='text-xs'>Typescript</h2>
            </div>
    </div>
    </div>
  )
}

export default SkillsPreview