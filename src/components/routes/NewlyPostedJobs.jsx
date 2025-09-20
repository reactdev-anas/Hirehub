import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // 
import { DataContext } from '../contextApi/UseContext';
import SuccessMessage from '../modal/SuccessMessage';
import ApplyJobModal from '../modal/ApplyJobModal';


const NewlyPostedJobs = () => {
    const [newJobs, setNewJobs] = useState([]);
      const [showModal, setShowModal]= useState(false)
      const [showMessage, setShowMessage]= useState(false)

    const {handleApplyJob} = useContext(DataContext)

    useEffect(() => {
        const getAllPostedJobs = JSON.parse(localStorage.getItem('newPostJob'));
        if (getAllPostedJobs) {
            // Convert object of arrays into a single array
            const allJobs = Object.values(getAllPostedJobs).flat();
            setNewJobs(allJobs);
        }
    }, []);



    return (
        <>
            <div className=" bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    🌐 New Posted Jobs
                </h2>

                {newJobs.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">No Jobs Available</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newJobs.map((job, index) => (
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
                                    <p><strong>📍 Location:</strong> {job.location || 'Not Provided'}</p>
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

                                {/* Apply Button */}
                                <div className=" mt-4" onClick={()=> { setShowModal(true), handleApplyJob(job)}}>
                                    <Button >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for Applying Jobs */}
       {showModal&& <ApplyJobModal setShowModal={setShowModal} setShowMessage={setShowMessage}/>}
         { showMessage && <SuccessMessage />}
        </>
    );
};

export default NewlyPostedJobs;
