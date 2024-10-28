import React, { useState, useEffect} from 'react'
import ResumePreview from './components/ResumePreview'
import CvPreview from './components/CvPreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import dummy from './data/dummy'
import DmPreview from './components/DmPreview'
import FollowupPreview from './components/FollowupPreview' 
import { useParams, useNavigate } from 'react-router-dom'

const index = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token') || false
    const [resumeInfo,setResumeInfo]=useState('')
    const [error, setError] = useState('');
    const [kits, setKits] = useState([]);

    useEffect(() => {
        setResumeInfo(dummy);
        //getJobKits();
    }, [])

    // get data from api
    const getJobKits = async () => {
        try {
            await Api.get('api/resume', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((res) => {
                    setKits(res.data)
                })
                .catch((err) => {
                    setError(err)
                })
        } catch (error) {
            setError(error)
        }
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div>
            <h1 className='text-center font-bold text-3xl'>Job kits Generated for job name</h1>
            <div className='text-xs p-4' style={{color:'orange'}}>
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