import React, { createContext, useState } from "react";
import { toast } from "sonner"

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
    const [applyJob, setApplyJob] = useState(null)
  

    const [formData, setFormData] = useState({
        title: '',
        posted_at: '',
        deadline: '',
        category: '',
        location: '',
        company: '',
        salary: '',
        workMode:'',
        jobOpenings: '',
        jobType: '',
        experience: '',
        gender: '',
        jobDescription: '',
        skills:''
    })
    console.log(formData)

    const handleChange = (e) => {
        e.preventDefault();
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }


    // { * Post Job*}
    const handleSubmit = (e) => {
        e.preventDefault();

        const currentRecruiter = JSON.parse(sessionStorage.getItem('loggedInDetail'))

        if(currentRecruiter.role !=='recruiter' || ! currentRecruiter.email){
            return "Log in first"

        }

        const getExistingJobs  =  JSON.parse(localStorage.getItem('newPostJob')) || {};

        if(!getExistingJobs[currentRecruiter.email]){
            getExistingJobs[currentRecruiter.email] = [];
        }
        getExistingJobs[currentRecruiter.email].push(formData);

        localStorage.setItem('newPostJob', JSON.stringify(getExistingJobs));
    
        toast.success("Job Created Successfully!")

        setFormData({
            title: '',
            posted_at: '',
            deadline: '',
            category: '',
            location: '',
            workMode: '',
            company: '',
            salary: '',
            jobOpenings: '',
            jobType: '',
            experience: '',
            gender: '',
            jobDescription: '',
            skills:''
        })


    }



    // {* Data between Tow Modals of Apply jobs*}
  const normalizeJob = (job) => {
    return {
      id: job.id || '',
      title: job.title || '',
      company: job.company || '',
      description: job.description || job.jobDescription || '',
      location: job.location || job.location,
      salary: job.salary || `${job.salary_from} - ${job.salary_to}` || '',
      jobType: job.jobType || job.employment_type || '',
      category: job.category || job.job_category || '',
      posted_at: job.posted_at || job.created_at || '',
      deadline: job.deadline || job.application_deadline || '',
      jobOpenings: job.jobOpenings || job.number_of_opening || '',
      contact: job.contact || '',
      skills: job.skills || (job.qualifications ? JSON.parse(job.qualifications).join(',') : ''),
    };
  };



    const handleApplyJob = (job) => {
    const normalized = normalizeJob(job);
    setApplyJob(normalized);
  };

  
    // {* Saved Job*}
    const handleSavedJob = (job) => {
        console.log("job save horhai he kya ")
        const newJob = {
            status: "Saved Jobs",
            jobs: job,
        };

        const currentUser = JSON.parse(sessionStorage.getItem("loggedInDetail"));

        if (!currentUser || !currentUser.email) {
             toast.error("No user logged in.");
        }

        const getAllSavedJob = JSON.parse(localStorage.getItem("savedJobs")) || {};

        if (!getAllSavedJob[currentUser.email]) {
            getAllSavedJob[currentUser.email] = [];
        }


        const isAlreadySaved = getAllSavedJob[currentUser.email].some(
            (saved) => saved.jobs.id === job.id
        );

        if (isAlreadySaved) {
          
           toast.warning("Job already saved!");
           return
        }


        getAllSavedJob[currentUser.email].push(newJob);

       localStorage.setItem("savedJobs", JSON.stringify(getAllSavedJob));
         toast.success("Job saved successfully!");
    
    };

    return (
        <DataContext.Provider value={{ formData, handleChange, handleSubmit, handleApplyJob, applyJob, handleSavedJob }}>
            {children}
        </DataContext.Provider>
    )
}