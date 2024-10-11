import React from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'

//check if user has uploaded resume
//if not, show message
//list jobs that user has applied for
const Dashboard = () => {
  return (
    <div >
      <Header />
      <div className='container pt-4 text-center' style={{margin:'auto'}} >
        <h3>You have no resume uploaded yet</h3>
        <p>Upload your resume to get started ...</p>
        <div className='flex justify-center pt-3'>
          <Button variant="outline">Upload</Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard