import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Api from '../Api';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Label } from '@/components/ui/label';


const Dashboard = () => {
  const token = localStorage.getItem('token') || false
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const [resume, setResume] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkUserResume = async () => {
    try {
      await Api.get('api/check-resume', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })
        .then((response) => {
          if (response.status == 200) {
            setResume(true)
          }
          else if ((response.status == 401)) {
            setResume(false)
          }
        })
    } catch (error) {
      if (error.response.status == 401) {
        setResume(false)
      }
      else {
        setError("Oops, something went wrong. Please try again later.")
      }
    }
  }

  const uploadResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      await Api.post('api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })
        .then((response) => {
          if (response.status == 200) {
            setSuccess("Resume uploaded successfully, you can now post jobs details and get started :)")
            setLoading(false)
          }
        })
    }
    catch (error) {
      setError("Oops, something went wrong. Please try again later.")
      setLoading(false)
    }
  }

  const handleResumeUpload = (event) => {
    setLoading(true)
    uploadResume(event.target.files[0])
  }

  useEffect(() => {
    checkUserResume()
  }, [])

  return (
    <div >
      <Header />
      <div>
        {error && (
          <div role="alert" className="alert alert-error max-w-sm mx-auto">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div role="alert" className="alert alert-success max-w-sm mx-auto">
            <span>{success}</span>
          </div>
        )}
      </div>

      {resume && !loading && (
        <div className='container pt-4 text-center' style={{ margin: 'auto' }}>
          <h3 className='text-2xl'>Your Resume</h3>
        </div>
      )}

      {!resume && !loading && (
        <div className='container pt-4 text-center' style={{ margin: 'auto' }} >
          <h3>You have no resume uploaded yet</h3>
          <p>Upload your resume to get started ...</p>

          {!loading && (
            <div className='flex justify-center pt-3'>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input id="picture" type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                />
              </div>
            </div>
          )}
        </div>
      )}
       {loading && (
        <div className='text-center pt-3'>
          <p>AI assistant is processing your resume</p>
          <div className='flex justify-center pt-3'>
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </div>
        </div>
          )}
    </div>
  )
}

export default Dashboard 