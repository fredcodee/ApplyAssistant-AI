import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Api from '../Api';
import { Input } from "@/components/ui/input"

const AddJob = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [jobLink, setJobLink] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobRequirements, setJobRequirements] = useState('')
    const [salary, setSalary] = useState('')

    const addJob = async () => {
        try {
            setLoading(true)
            await Api.post('api/add-job', {
                companyName,
                companyWebsite,
                jobLink,
                jobTitle,
                jobDescription,
                jobRequirements,
                salary
            })
                .then((response) => {
                    if (response.status == 200) {
                        setSuccess('Job added successfully')
                        setLoading(false)
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
      <div className='container' style={{margin: 'auto'}}>
        <div className='text-center text-lg pt-5 pb-3'>
            <h1>Add Job and let AI assistants build your resume and kits for you to apply</h1>
        </div>
        <Input type="text" placeholder="Company Name"  className='mb-3' onChange={(e) => setCompanyName(e.target.value)}/>
        <Input type="text" placeholder="Company website"   className='mb-3'  onChange={(e) => setCompanyWebsite(e.target.value)}/>
        <Input type="text" placeholder="Job Link"   className='mb-3' onChange={(e) => setJobLink(e.target.value)}/>
        <Input type="text" placeholder="Job Title"   className='mb-3'  onChange={(e) => setJobTitle(e.target.value)}/>
        <Input type="text" placeholder="Job Description"  style={{height: '150px'}}  className='mb-3'  onChange={(e) => setJobDescription(e.target.value)}/>
        <Input type="text" placeholder="Job Requirements" style={{height: '150px'}}   className='mb-3' onChange={(e) => setJobRequirements(e.target.value)}/>
        <Input type="text" placeholder="salary"   className='mb-3'  onChange={(e) => setSalary(e.target.value)}/>
        <div className='text-center text-lg pt-5 pb-3'>
            <Button variant="outline" onClick={addJob}>Add Job & Build Kits</Button>
        </div>
      </div>
    </div>
  )
}

export default AddJob