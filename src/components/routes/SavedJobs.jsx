import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))
    if (!currentUser || !currentUser.email) {
      setSavedJobs([])
      return
    }

    const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs')) || {}
    const userSavedJobs = allSavedJobs[currentUser.email] || []

    setSavedJobs(userSavedJobs)
  }, [])

  const handleDelete = (jobId) => {
    const currentUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))
    if (!currentUser || !currentUser.email) return

    const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs')) || {}
    const userJobs = allSavedJobs[currentUser.email] || []

    const updatedJobs = userJobs.filter((saved) => saved.jobs.id !== jobId)

    allSavedJobs[currentUser.email] = updatedJobs
    localStorage.setItem('savedJobs', JSON.stringify(allSavedJobs))
    setSavedJobs(updatedJobs)
  }

  return (
    <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        💾 Saved Job Posts
      </h2>

      {savedJobs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No saved jobs yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedJobs.map((saved) => {
            const job = saved.jobs

            return (
              <div
                key={job.id}
                className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg p-6 flex flex-col"
              >
                {/* Delete Icon */}
                <button
                  onClick={() => handleDelete(job.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 focus:outline-none"
                  title="Remove"
                >
                  <FaTrash size={18} />
                </button>

                {/* Company Logo Placeholder */}
                {job.companyLogoUrl ? (
                  <img
                    src={job.companyLogoUrl}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg mb-4 text-gray-500">
                    🏢
                  </div>
                )}

                {/* Job Title + Company */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 truncate">{job.company}</p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.is_remote_work === 1 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Remote
                    </span>
                  )}
                  {job.employment_type && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {job.employment_type}
                    </span>
                  )}
                  {job.job_category && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {job.job_category}
                    </span>
                  )}
                </div>

                {/* Key Info */}
                <div className="text-sm text-gray-700 space-y-2 mb-4">
                  <p><strong>📍 Location:</strong> {job.location}</p>
                  <p><strong>💰 Salary:</strong> ₹{job.salary_from?.toLocaleString()} - ₹{job.salary_to?.toLocaleString()}</p>
                  <p><strong>📅 Deadline:</strong> {job.application_deadline}</p>
                  <p><strong>🧑‍💼 Vacancies:</strong> {job.number_of_opening}</p>
                </div>

             
                
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SavedJobs
