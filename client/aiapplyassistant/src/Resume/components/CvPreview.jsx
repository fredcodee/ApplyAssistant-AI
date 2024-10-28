import React, { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const CvPreview = () => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <div className='float-right'>
          <h2>{resumeInfo?.companyName}</h2>
        </div>
        <div className='text-lg font-bold'>
          <h2>Application for: {resumeInfo?.role}</h2>
        </div>
        <div>
          <p>Dear {resumeInfo?.companyName} team</p>
          <p>{resumeInfo?.cv}</p>
          <p className='pt-5'>
            Best regards,<br/>
            {resumeInfo?.name}<br/>
            {resumeInfo?.email}
          </p>
        </div>
    </div>
  )
}

export default CvPreview