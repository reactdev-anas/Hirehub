import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()
    useEffect(()=>{
  const getUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))

  if(!getUser){
  navigate('/')

  }
    },[navigate])


  return ( 
  <> 
  {children} 
  </>
  )

}

export default ProtectedRoutes