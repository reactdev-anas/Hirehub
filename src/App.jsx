import React, { lazy, Suspense } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import LandingPage from './components/landingPage/LandingPage'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes'
import { Toaster } from "sonner";
const FindJob  = lazy(()=> import("./components/routes/FindJob"))
const PostJob  = lazy(()=> import("./components/routes/PostJob"))
const CommunityPost  = lazy(()=> import("./components/routes/CommunityPost"))
const SavedJobs  = lazy(()=> import("./components/routes/SavedJobs"))
const AppliedJobs  = lazy(()=> import("./components/routes/AppliedJobs"))
const NewlyPostedJobs  = lazy(()=> import("./components/routes/NewlyPostedJobs"))
function App() {


  return (
    <>
     <Router>
      <Suspense fallback={<div className='flex justify-center min-h-screen items-center text-2xl text-primary'>Loading...</div>}>
    <Routes>
      <Route path='/' element={<ProtectedRoutes><LandingPage/></ProtectedRoutes>} />
      <Route path='/find-job' element={<ProtectedRoutes><FindJob/></ProtectedRoutes>} />
      <Route path='/post-job' element={<ProtectedRoutes><PostJob/></ProtectedRoutes>} />
      <Route path='/community-post' element={<ProtectedRoutes><CommunityPost/></ProtectedRoutes>} />
      <Route path='/saved-jobs' element={<ProtectedRoutes><SavedJobs/></ProtectedRoutes>} />
      <Route path='/applied-jobs' element={<ProtectedRoutes><AppliedJobs/></ProtectedRoutes>} />
      <Route path='/newlyPosted-jobs' element={<NewlyPostedJobs/>} />
    </Routes>
  </Suspense>
     </Router>
      <Toaster position="top-center" richColors /> 
    </>
  )
}

export default App

