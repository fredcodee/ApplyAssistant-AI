import React, { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const DmPreview = () => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <div>
          <p>Hi, {resumeInfo?.companyName} team</p>
          <p>{resumeInfo?.dmMessage}</p>
        </div>
    </div>
  )
}

export default DmPreview