import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import AuthContext from '../context/AuthContext';


function Header() {
  const { logoutUser } = useContext(AuthContext)
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <a href='/dashboard'>
        <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
      </a>
      <div >
        <div>
        <a href="">
          <Button variant="outline" >Upload your resume</Button>
          </a>
        </div>
      </div>
      <div>
        <div>
          <a href="/add-job">
          <Button variant="outline" >Add Job</Button>
          </a>
        </div>

      </div>
      <div className='flex gap-2 items-center'>
          <Button variant="outline" onClick={logoutUser} style={{ backgroundColor: 'red'}}>Logout</Button>
      </div>
    </div>
  )
}

export default Header