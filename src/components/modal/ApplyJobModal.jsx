import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contextApi/UseContext'
import { Button } from '../ui/button'
import { toast } from "sonner"
import ReactDOM from 'react-dom'


const ApplyJobModal = ({ setShowModal, setShowMessage }) => {
    const [applyPortal, setApplyPortal] = useState(null)
    const [resume, setResume] = useState(null)
    const [input, setInput] = useState('')


    const { applyJob } = useContext(DataContext)
    console.log(applyJob)

    useEffect(() => {
        const getId = document.getElementById('apply-jobModal')
        setApplyPortal(getId)
    }, [])

    if (!applyPortal) {
        return null;
    }

    const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        category,
        posted_at,
        deadline,
        jobOpenings,
        contact,
        skills
    } = applyJob;


    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (input.trim() === '' || resume === null) {
            toast.error("Please fill in the form and upload your resume.")
            return
        }

        try {
            const base64Resume = await convertFileToBase64(resume)

            const newApply = {
                status: 'Applied job',
                uploadResume: base64Resume,
                textField: input,
                appliedJobs: applyJob,
            }

            const currentUser = JSON.parse(sessionStorage.getItem('loggedInDetail'))

            if (!currentUser || !currentUser.email) {
                toast.error("No user logged in.")
                return
            }

            const getAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || {}

            if (!getAppliedJobs[currentUser.email]) {
                getAppliedJobs[currentUser.email] = []
            }

            const isAlreadyApplied = getAppliedJobs[currentUser.email].some((applied) => {

                return applied.appliedJobs && applied.appliedJobs.id === applyJob?.id
            })

            if (isAlreadyApplied) {
                toast.warning("You already applied for this job!")
                return
            }

            getAppliedJobs[currentUser.email].push(newApply)
            localStorage.setItem('appliedJobs', JSON.stringify(getAppliedJobs))

            setInput('')
            setResume(null)
            setShowModal(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 1800)

        } catch (err) {
            console.error("Failed to convert file to base64 or save:", err)
            toast.error("Something went wrong while uploading your resume.")
        }
    }



    return ReactDOM.createPortal(
        <>
            <div className='fixed inset-0 z-50 flex justify-center items-center backdrop-brightness-50'>
                <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]'>
                    
                    {/* Header */}
                    <h2 className='text-center text-lg font-semibold text-gray-700 mb-3'>
                        Apply for <span className="text-blue-600">{jobType}</span>
                        <span className='float-end cursor-pointer text-primary' onClick={() => setShowModal(false)}>X</span>
                    </h2>

                    <p className='text-blue-700 text-xl mb-1 font-bold'>
                        {title}{" "}
                        <span className='ml-2 px-2 py-1 bg-green-100 text-blue-700 text-xs rounded'>
                            🚀 Actively hiring
                        </span>
                    </p>

                    <p className='text-sm text-gray-600 mb-2'>{company}</p>
                     
                     {/* Details */}
                    <div className='space-y-2 text-sm text-gray-700'>
                        <p>💰  ₹{salary} </p>
                        <p>📍 {location}</p>
                        <p>🕒 {jobType}</p>
                        <p>📂 {category}</p>
                        <p>🗓️ Posted:  {posted_at}</p>
                        <p>⏳ Deadline:  {deadline}{" "}
                            <span className='ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded'>
                                🧑‍💼 Vacancies  {jobOpenings}
                            </span>
                        </p>
                        { contact && <p>📞 {contact} </p>}
                    </div>


                     {/* Skills */}
                    {skills && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {skills.split(',').map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className='my-4'>
                        <label className='font-semibold text-base'>
                            📋 Role and Responsibilities:
                        </label>
                        <p className='mt-2 text-sm text-gray-600'>
                           {description}  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sequi ad aspernatur voluptatibus delectus voluptatum rem numquam veritatis asperiores alias recusandae a illo quia, repellat quas aperiam reprehenderit molestiae inventore.
                        </p>
                    </div>
                     
                     {/* Hire message */}
                    <div className='my-2'>
                        <label className='font-semibold text-base'>
                            ✍️ Why should you be hired for this role?
                        </label>
                        <textarea
                            rows='4'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='w-full mt-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            placeholder='Write your response here...'
                        ></textarea>
                    </div>
                    <div className="my-4">
                        <label className="font-semibold text-base block mb-2">
                            📎 Upload Resume (PDF/DOC)
                        </label>
                         
                         {/* Resume upload */}
                        {!resume ? (
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResume(e.target.files[0])}
                                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        ) : (
                            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md border border-gray-300">
                                <p className="text-sm text-green-700 truncate">
                                    📄 {resume.name}
                                </p>
                                <button
                                    onClick={() => setResume(null)}
                                    className="ml-4 text-red-600 text-xs hover:underline"
                                >
                                    ❌ Remove
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Button */}
                    <div className='float-end my-2 cursor-pointer'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </>,
        applyPortal
    )
}

export default ApplyJobModal
