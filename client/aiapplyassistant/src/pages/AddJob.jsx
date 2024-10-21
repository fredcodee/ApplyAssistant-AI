import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Api from '../Api';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const AddJob = () => {
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [jobLink, setJobLink] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [salary, setSalary] = useState('')

    const addJob = async () => {
        try {
            setLoading(true)
            setError(null)
            await Api.post('api/add-job', {
                companyName,
                companyWebsite,
                jobLink,
                jobTitle,
                jobDescription,
                salary
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setSuccess('Job added successfully and kits generated successfully.')
                        setLoading(false)
                        // navigate to kits page
                    }
                })
        } catch (error) {
            setError('Oops, something went wrong. Please try again later.')
            setLoading(false)
        }
    }

  return (
    <div>
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
      {loading && (
        <div className='text-center pt-3'>
          <p>AI assistant is generating your kits to apply to this jobs</p>
          <div className='flex justify-center pt-3'>
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait ...
              </Button>
            </div>
        </div>
          )}

      {!loading && (
        <div className='container' style={{margin: 'auto'}}>
        <div className='text-center text-lg pt-5 pb-3'>
            <h1>Add Job and let AI assistants build your resume and kits for you to apply</h1>
        </div>
        <Input type="text" placeholder="Company Name"  className='mb-3' onChange={(e) => setCompanyName(e.target.value)}/>
        <Input type="text" placeholder="Company website"   className='mb-3'  onChange={(e) => setCompanyWebsite(e.target.value)}/>
        <Input type="text" placeholder="Job Link"   className='mb-3' onChange={(e) => setJobLink(e.target.value)}/>
        <Input type="text" placeholder="Job Title"   className='mb-3'  onChange={(e) => setJobTitle(e.target.value)}/>
        <Input type="text" placeholder="Job Description"  style={{height: '150px'}}  className='mb-3'  onChange={(e) => setJobDescription(e.target.value)}/>
        <Input type="text" placeholder="salary"   className='mb-3'  onChange={(e) => setSalary(e.target.value)}/>
        <div className='text-center text-lg pt-5 pb-3'>
            <Button variant="outline" onClick={addJob}>Add Job & Let AI Build Kits</Button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AddJob