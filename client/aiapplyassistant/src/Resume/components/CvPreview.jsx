import React from 'react'

const CvPreview = () => {
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <div className='float-right'>
          <h2>Company Name</h2>
        </div>
        <div className='text-lg font-bold'>
          <h2>Application for: Job Title</h2>
        </div>
        <div>
          <p>Dear companyName team</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur rem, eum maiores quasi similique unde? Voluptatibus ullam debitis facere nostrum quaerat est reiciendis commodi, enim saepe distinctio amet magni necessitatibus?</p>
          <p className='pt-5'>
            Best regards,<br/>
            your name <br/>
            your email@gmail.com
          </p>
        </div>
    </div>
  )
}

export default CvPreview