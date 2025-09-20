// import React, { useEffect, useState } from 'react'
// import { FaTrash } from 'react-icons/fa'

// const AppliedJobs = () => {
//     const [appliedJobs, setAppliedJobs]= useState([])
//     console.log(appliedJobs)



//     useEffect(()=>{
//    const currentUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))
//    if(!currentUser || !currentUser.email){
//     setAppliedJobs([])
//     return;
//    }
//    const getAllAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || {}

//    const jobs = getAllAppliedJobs[currentUser.email] || [];
//    setAppliedJobs(jobs)
//     },[])


//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
//        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//         💾 Applied Job Posts
//       </h2>
//       {appliedJobs.length === 0 ? ( <div className="text-center text-gray-600 text-lg">
//           No saved jobs yet.
//         </div> ): (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {appliedJobs.map((applied)=>{
//             const apply = applied.appliedJobs
//             return  <div
//                             key={apply.id}
//                             className="bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg p-6 relative transition duration-300"
//                           >
//                             {/* Delete Button */}
//                             <button
//                               // onClick={() => handleDelete(apply.id)}
//                               className="absolute top-7 cursor-pointer right-3 text-red-600 hover:text-red-800"
//                               title="Remove Job"
//                             >
//                               <FaTrash />
//                             </button>
            
//                             <h3 className="text-xl font-semibold text-blue-700 mb-2">
//                               {apply.title}
//                             </h3>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">🏢 Company:</span> {apply.company}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">📍 Location:</span> {apply.location}
//                               {apply.is_remote_work === 1 && (
//                                 <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
//                                   Remote
//                                 </span>
//                               )}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">💼 Type:</span> {apply.employment_type}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">💰 Salary:</span> ₹
//                               {apply.salary_from?.toLocaleString()} - ₹
//                               {apply.salary_to?.toLocaleString()}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">📂 Category:</span> {apply.job_category}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">🧑‍💼 Openings:</span> {apply.number_of_opening}
//                             </p>
            
//                             <p className="text-gray-700 mb-1">
//                               <span className="font-medium">📅 Deadline:</span> {apply.application_deadline}
//                             </p>
            
//                             <p className="text-gray-700 text-sm mt-2 ">
//                               <span className="font-medium">📞 Contact: </span> {apply.contact}
                             
//                             </p>
//                           </div>
        
//           })}
//           </div>
//            )  
//         }
       
//     </div>
//   )
// }

// export default AppliedJobs


import React, { useEffect, useState } from 'react'

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))
    if (!currentUser || !currentUser.email) {
      setAppliedJobs([])
      return
    }

    const getAllAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || {}
    const jobs = getAllAppliedJobs[currentUser.email] || []
    setAppliedJobs(jobs)
  }, [])

  return (
    <div className=" bg-gray-100 py-10  px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        📄 Applied Job Posts
      </h2>

      {appliedJobs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No applied jobs yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-y-6 ">
          {appliedJobs.map((applied) => {
            const job = applied.appliedJobs
            return (
              <div
                key={job.id}
                className="bg-white rounded-lg border w-80 h-70 sm:w-76 md:w-70 lg:w-70 mx-auto sm:mx-0   md:mx-0 lg:mx-0 border-gray-200 shadow-md hover:shadow-lg p-4 flex flex-col justify-between"
              
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-green-700 font-semibold text-sm">
                    ₹{job.salary_from?.toLocaleString()} - ₹{job.salary_to?.toLocaleString()}
                  </p>
                  <p className="text-xs font-medium text-blue-600 border border-blue-200 px-2 py-0.5 rounded">
                    {job.is_remote_work === 1 ? 'Remote' : 'Onsite'}
                  </p>
                </div>

                {/* Title */}
               
                <h3 className="text-3xl font-semibold my-auto mx-2 text-gray-800 text-start mb-4 leading-tight break-words">
                  {job.title}
                </h3>
           

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-600 mt-auto pt-4 border-t">
                  <p >📂 {job.job_category}</p>
                  <span className="text-xs  text-green-600 font-medium">✅ Applied Job</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AppliedJobs


