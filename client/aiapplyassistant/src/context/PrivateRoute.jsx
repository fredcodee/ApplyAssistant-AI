import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import Api from '../Api'

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token') || false
  const [validate, setValidate] = useState(null)

  useEffect(()=>{
    checkToken()
  },[])


  const checkToken = async () => {
    try {
      if (!token){
        setValidate(false)
        return
      }
      await Api.get('api/user', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })
        .then((response) => {
          if (response.status == 200) {
            setValidate(true)
          } else {
            setValidate(false)
          }
        })
    } catch (error) {
      setValidate(false)
    } 
  }

  if (validate == null){
    checkToken()
  }
  else if (!validate) {
    localStorage.removeItem('token');
    return <Navigate to="/signin" />
  }
  return children
}



export default PrivateRoute