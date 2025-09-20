import React, { useContext } from 'react'
import { DataContext } from '../contextApi/UseContext'

const PostJob = () => {
  const { formData, handleChange, handleSubmit } = useContext(DataContext)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🚀 Post a New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Row 1: Title, Posted At, Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} required />
            <Input label="Posted At" type="date" name="posted_at" value={formData.posted_at} onChange={handleChange} required />
            <Input label="Deadline" type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
          </div>

          {/* Row 2: Category & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Frontend Developer", "Backend Developer", "Full-Stack Developer",
                "DevOps Engineer", "UI / UX Developer", "Artificial Intelligence"
              ]}
            />
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              options={[
                "Mumbai", "Bangalore", "Hyderabad", "Delhi", "Chennai", "Pune"
              ]}
            />
          </div>

          {/* Row 3: Company & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Company Name" name="company" value={formData.company} onChange={handleChange} required />
            <Input label="Salary Range (e.g., 60k - 120k)" name="salary" value={formData.salary} onChange={handleChange} required />
          </div>

          {/* Row 4: Job Openings, Work Mode, Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Number of Openings" type="number" name="jobOpenings" value={formData.jobOpenings} onChange={handleChange} required />
            <Input label="Work Mode (e.g., Remote / On-site)" name="workMode" value={formData.workMode} onChange={handleChange} required />
            <Select
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              options={["Full time", "Part time", "Internship"]}
            />
          </div>

          {/* Row 5: Experience & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Experience Required"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              options={["1 year", "2 years", "3 years", "5 years", "Above 5 years"]}
            />
            <Select
              label="Preferred Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Job Description</label>
            <textarea
              name="jobDescription"
              rows={6}
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe the job responsibilities, requirements, etc."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Required Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, Tailwind, Git, Node.js"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-white font-semibold text-lg py-3 rounded-md transition duration-200 shadow-lg"
            >
              ✅ Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJob

// Reusable input component
const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-700">{label}</label>
    <input
      type={type}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      {...props}
    />
  </div>
);

// Reusable select component
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-700">{label}</label>
    <select
      className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      {...props}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

