import React, { useState, useEffect } from 'react'
import ResumePreview from './components/ResumePreview'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import { Button } from "@/components/ui/button"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import '../assets/styles/resume.css'

const ResumeView = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token') || false
    const [resumeInfo, setResumeInfo] = useState('')
    const [error, setError] = useState('');

    const getJobKits = async () => {
        try {
            await Api.post('api/jobkits', {
                jobId: id
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((res) => {
                    setResumeInfo(res.data)
                })
                .catch((err) => {
                    setError(err)
                })
        } catch (error) {
            setError(error)
        }
    }

    const handleDownload = async () => {
        try {
            window.print()
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getJobKits()
    }, [])


    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {error && (
                <div role="alert" className="alert alert-error max-w-sm mx-auto">
                    <span>{error}</span>
                </div>
            )}

            <div className='text-center p-3' id='no-print'>
                <Button variant="outline" onClick={handleDownload}>Download resume</Button>
            </div>
            <div>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>

    )
}

export default ResumeView
