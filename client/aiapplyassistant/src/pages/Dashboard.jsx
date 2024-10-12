import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Api from '../Api';
import { Input } from "@/components/ui/input"


const Dashboard = () => {
  const token = localStorage.getItem('token') || false
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const [resume, setResume] = useState(false)

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
      </div>

      {resume && (
        <div className='container pt-4 text-center' style={{ margin: 'auto' }}>
          <h3 className='text-2xl'>Your Resume</h3>
        </div>
      )}

      {!resume && (
        <div className='container pt-4 text-center' style={{ margin: 'auto' }} >
          <h3>You have no resume uploaded yet</h3>
          <p>Upload your resume to get started ...</p>
          <div className='flex justify-center pt-3'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input id="picture" type="file" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard 