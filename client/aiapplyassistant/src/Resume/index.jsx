import React, { useState, useEffect, useContext} from 'react'
import ResumePreview from './components/ResumePreview'
import CvPreview from './components/CvPreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import dummy from './data/dummy'
import DmPreview from './components/DmPreview'
import FollowupPreview from './components/FollowupPreview' 

const index = () => {
    const [resumeInfo,setResumeInfo]=useState('')

    useEffect(() => {
        setResumeInfo(dummy);
    }, [])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div>
            <h1 className='text-center font-bold text-3xl'>Job kits Generated for job name</h1>
            <div className='text-xs p-2' style={{color:'orange'}}>
                <a href="/dashboard">go back to dashboard</a>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <div>
                    <h2 className='text-center font-bold text-sm pb-5'>Cover Letter</h2>
                    <CvPreview />
                </div>
                <div>
                    <h2 className='text-center font-bold text-sm pb-5'>Resume</h2>
                    <ResumePreview />
                </div>
                <div className='mt-4'>
                    <h2 className='text-center font-bold text-sm pb-5'>Linkdin message</h2>
                    <DmPreview />
                </div>
                <div className='mt-4'>
                    <h2 className='text-center font-bold text-sm pb-5'>Follow-up message</h2>
                    <FollowupPreview />
                </div>
            </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default index