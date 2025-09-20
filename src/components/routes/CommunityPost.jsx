import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const CommunityPost = () => {
  const [newJob, setNewJob] = useState([]);
  const [roleAccess, setRoleAccess] = useState(null)
  console.log(roleAccess)

  const getCommunityJobs = () => {
    const currentRecruiter = JSON.parse(sessionStorage.getItem('loggedInDetail'))
    setRoleAccess(currentRecruiter)
    const getAllNewJobs = JSON.parse(localStorage.getItem('newPostJob')) || {};
    const recruiterJob = getAllNewJobs[currentRecruiter.email] || [];
    setNewJob(recruiterJob);
  };

  useEffect(() => {
    getCommunityJobs();
  }, []);

  const handleDeleteJob = (index) => {
    const currentRecruiter = JSON.parse(sessionStorage.getItem('loggedInDetail'))


    if (currentRecruiter.role !== 'recruiter' || !currentRecruiter.email) return;

    const getExistingJobs = JSON.parse(localStorage.getItem('newPostJob')) || {};

    const userJobs = getExistingJobs[currentRecruiter.email] || [];

    const updatedJobs = userJobs.filter((job, idx) => idx !== index)

    getExistingJobs[currentRecruiter.email] = updatedJobs;

    localStorage.setItem('newPostJob', JSON.stringify(getExistingJobs))
    setNewJob(updatedJobs)



  }

  return (
    <div className=" bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🌐 Community Job Posts
      </h2>

      {newJob.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No Jobs Available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newJob.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-blue-800">{job.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{job.company}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {job.workMode}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {job.jobType}
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  {job.experience}
                </span>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p><strong>📍 Location:</strong> {job.location}</p>
                <p><strong>💰 Salary:</strong> {job.salary}</p>
                <p><strong>👥 Openings:</strong> {job.jobOpenings}</p>
                <p><strong>🗓️ Deadline:</strong> {job.deadline}</p>
              </div>

              {/* Skills */}
              {job.skills && (
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-800 mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex mt-4">

                <Button variant='secondary' onClick={() => handleDeleteJob(index)}>
                  Delete
                </Button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPost;

