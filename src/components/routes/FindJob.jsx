import React, { lazy, Suspense, useContext, useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CiBookmark } from "react-icons/ci";
import JobFilters from "../JobFilter"
import ApplyJobModal from "../modal/ApplyJobModal"
import { DataContext } from "../contextApi/UseContext"
import SuccessMessage from "../modal/SuccessMessage"



const STATE = {
  LOADING:'LOADING',
  SUCCESS:'SUCCESS',
  ERROR :'ERROR'
}

const FindJob = () => {
  const [jobData, setJobData] = useState([])

  const [page, setPage] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [inputProfile, setInputProfile]= useState('')
  const [partTime, setPartTime] = useState(false)
  const [fullTime, setFullTime] = useState(false)
  const [intern, setIntern] = useState(false)
  const [remote, setRemote]= useState(false)
  const [onsite, setOnsite]= useState(false)
  const [status, setStatus]= useState(STATE)
  const [showModal, setShowModal]= useState(false)
  const [showMessage, setShowMessage]= useState(false)

  const {handleApplyJob,handleSavedJob, }= useContext(DataContext)

  const handleFetchJobs = async () => {
    try {
      setStatus("LOADING")
      const response = await fetch(
        `https://jsonfakery.com/jobs/simple-paginate?page=${page}`
      )
      const result = await response.json()
      setJobData(result.data)
       setStatus("SUCCESS")
      console.log("Sample Job Category:", result.data[0].job_category)
    } catch (error) {
      console.log("Error while fetching the data", error)
      setStatus("ERROR")
    }
  }

  useEffect(() => {
    handleFetchJobs()
  }, [page])

  const handleNext = () => setPage((prevPage) => prevPage + 1)
  const handlePrev = () => page > 1 && setPage((prevPage) => prevPage - 1)

  const nextTwo = Array.from({ length: 2 }, (_, i) => page + i + 1)
  const prevTwo = Array.from({ length: 2 }, (_, i) => page - i).filter(
    (val) => val > 1
  )
  const pageNumbers = [...prevTwo, ...nextTwo]

const filterProfile=[...jobData].filter((job)=>{
  return inputProfile ? job.title.toLowerCase().includes(inputProfile.toLowerCase()):true
})
  const filterPartTime = filterProfile.filter((job) => {
    return partTime ? job.employment_type.toLowerCase().includes('part') : true
  })
  const filterFullTime = filterPartTime.filter((job) => {
    return fullTime ? job.employment_type.toLowerCase().includes('full') : true
  })

  const filterIntern = filterFullTime.filter((job) => {
    return intern ? job.employment_type.toLowerCase().includes('inter') : true
  })

  const filterRemoteJob = filterIntern.filter((job)=>{
    return remote ? job.is_remote_work >0 : true
  })

  const filterOnsiteJob = filterRemoteJob.filter((job)=>{
    return onsite ? job.is_remote_work ===0 : true
  })

  const filterJob = filterOnsiteJob.filter((job) => {
    return selectedType ? job.job_category.toLowerCase().includes(selectedType.toLowerCase()) : true
  })


  return (
    <>
    {/* Handling Loding message */}
    { status===STATE.LOADING && <div className="text-center text-xl mt-6 font-semibold text-primary">...Loading</div>}

    {/* Handling Success Message */}
    {status === STATE.SUCCESS &&  (<> <section className="w-full min-h-screen px-4  sm:px-10 py-10 bg-gray-100 overflow-x-hidden">
        <div className=" max-w-7xl relative mx-auto lg:px-9  flex flex-col lg:flex-row gap-x-6 gap-y-8">
          {/* Sidebar Filter (desktop) */}
          <aside className="hidden lg:sticky lg:top-0 lg:block w-full lg:w-1/4 bg-white border rounded p-4 h-fit shadow-sm">
            <JobFilters
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              partTime={partTime}
              setPartTime={setPartTime}
              fullTime={fullTime}
              setFullTime={setFullTime}
              intern={intern}
              setIntern={setIntern}
              remote={remote}
              setRemote={setRemote}
              onsite={onsite}
              setOnsite={setOnsite}
              inputProfile={inputProfile}
              setInputProfile={setInputProfile}

            />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Top Filter (mobile) */}
            <div className="lg:hidden mb-6 bg-white rounded shadow-sm p-4">
              <JobFilters 
              
               selectedType={selectedType}
              setSelectedType={setSelectedType}
              partTime={partTime}
              setPartTime={setPartTime}
              fullTime={fullTime}
              setFullTime={setFullTime}
              intern={intern}
              setIntern={setIntern}
              remote={remote}
              setRemote={setRemote}
              onsite={onsite}
              setOnsite={setOnsite}
              inputProfile={inputProfile}
              setInputProfile={setInputProfile}

              />
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {filterJob.map((job) => (
                <Card
                  key={job.id}
                  className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-700 flex justify-between items-center">
                      {job.title}
                      <span><CiBookmark cursor={'pointer'} onClick={()=> handleSavedJob(job)}/></span>
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {job.company}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="text-sm text-gray-700 space-y-2">
                    <p>
                      <span className="font-medium text-gray-800">Location:</span>{" "}
                      {job.location}
                      {job.is_remote_work === 1 && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Remote
                        </span>
                      )}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Type:</span>{" "}
                      {job.employment_type}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Category:</span>{" "}
                      {job.job_category}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Salary:</span>{" "}
                      ₹{job.salary_from.toLocaleString()} - ₹
                      {job.salary_to.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Posted:</span>{" "}
                      {job.created_at}
                    </p>
                    

                    {/* Skills/Qualifications */}
                    {job.qualifications && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {JSON.parse(job.qualifications)
                          .map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button variant="default" onClick={()=> {setShowModal(true), handleApplyJob(job)}}>View</Button>
                   
                  </CardFooter>
                </Card>
              ))}
            </div>
            



          </main>
        </div>

      </section>
    
     {/* Pagination */}
      <Pagination className='mt-3'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrev} />
          </PaginationItem>

          {pageNumbers.map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                onClick={() => setPage(num)}

              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination> 
      </>
    )}

    {/* Error handling Message */}
    {status===STATE.ERROR && <div className="text-center text-xl mt-6 font-semibold text-primary">Error Occured</div>}

    {/* Modal for Apply job */}
      {showModal&& <ApplyJobModal setShowModal={setShowModal} setShowMessage={setShowMessage}/>}
         { showMessage && <SuccessMessage />}

      
    </>
  )
}

export default FindJob


