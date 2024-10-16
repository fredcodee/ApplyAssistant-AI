import React from 'react'

const PersonDetailsPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className='font-bold text-lg text-center'
        style={{
            color:resumeInfo?.themeColor
        }}
        >
            {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-md font-medium pb-2'
       >{resumeInfo?.jobTitle}</h2>

        <div className='flex justify-between'>
        <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>{resumeInfo?.portfolioLink}</h2>

            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>{resumeInfo?.githubLink}</h2>

            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>{resumeInfo?.email}</h2>

        </div>

        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}
        />
        <div className='text-center text-sm pb-2'>
          <p>{resumeInfo?.summary}</p>
        </div>
    </div>
  )
}

export default PersonDetailsPreview