import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import SignUp from '../modal/SignUp'

const RoleBasedProfile = lazy(()=> import('../routes/RoleBasedProfile'))


const NavBar = () => {
  const [showSignUpModal, setShowSignUpModal]= useState(false)
  const [showUserProfile, setShowUserProfile]= useState(false)

  useEffect(()=>{
   const getLoggedInDetail = JSON.parse(sessionStorage.getItem('loggedInDetail'))

   if(getLoggedInDetail){
    setShowUserProfile(true)
   }
  },[])
  return (
    <div className= 'w-screen relative flex justify-between py-7 px-10' >

      {/* Logo */}
     <h2 className='font-semibold text-2xl'>.HireHub</h2>
   
     {!showUserProfile && (
      
      // {* Login / Sign Up*}
  <Button variant="ghost" onClick={() => setShowSignUpModal(true)}>
    Login
  </Button>
)}
       {/* Login / Sign Up Modals */}
   
       {showSignUpModal && <SignUp setShowSignUpModal={setShowSignUpModal}/>}
       <Suspense fallback={<div className='w-screen min-h-screen flex items-center justify-center text-2xl font-semibold'>Loading...</div>}>
      { showUserProfile && <RoleBasedProfile setShowUserProfile={setShowUserProfile}/>}
      </Suspense>
  
   
    </div>
  )
}

export default NavBar