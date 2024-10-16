import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './previews/PersonDetailsPreview'
import EducationPreview from './previews/EducationPreview'
import ExperiencePreview from './previews/ExperirencePreview'
import SkillsPreview from './previews/SkillsPreview'

function ResumePreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Professional Experience  */}
           {resumeInfo?.experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo}/>}
         {/* Educational  */}
         {resumeInfo?.education?.length>0&&   <EducationPreview resumeInfo={resumeInfo} />}
    </div>
  )
}

export default ResumePreview