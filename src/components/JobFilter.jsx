import React from "react"
import { CiFilter } from "react-icons/ci";

const JobFilters = ({
  inputProfile, 
  setInputProfile,
   selectedType,
   partTime,
    setPartTime,
   setSelectedType,
   fullTime,
   setFullTime, 
   intern, 
   setIntern,
   remote,
   setRemote,
   onSite,
    setOnsite,
   }) => {
  return (
    <div className="space-y-4">
      {/* Job Type */}
      <h2 className=" font-semibold flex items-center justify-center text-blue-700 text-xl"> <CiFilter style={{marginRight:'10px'}}/> Filters</h2>
     {/* Profile */}
      <div className="font-smibold mb-2 flex flex-col">
        <label >Profile</label>
        <input type="text" value={inputProfile} onChange={(e)=> setInputProfile(e.target.value)} className="my-2 py-1 px-2 rounded border border-gray-400 " placeholder="eg: Marketing" />
      </div>
      <div>
        <h4 className="font-semibold mb-2">Job Type</h4>
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={fullTime} onChange={(e)=> setFullTime(e.target.checked)} />
            Full-time
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={partTime} onChange={(e)=> setPartTime(e.target.checked)} />
            Part-time
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value={intern} onChange={(e)=> setIntern(e.target.checked)} />
            Internship
          </label>
        </div>
      </div>

      {/* Work Mode */}
      <div>
        <h4 className="font-semibold mb-2">Work Mode</h4>
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={remote} onChange={(e)=> setRemote(e.target.checked)} />
            Remote
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={onSite} onChange={(e)=> setOnsite(e.target.checked)} />
            On-site
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Hybrid
          </label>
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full border border-gray-300 p-2 rounded">
          <option value=''>All</option>
          <option value="Front-end Developer">Frontend</option>
          <option value="Back-end Developer">Backend</option>
          <option value="UI/UX Designer">UI / UX Designer</option>
          <option value="Full-stack Developer">Full Stack Developer</option>
        </select>
      </div>
      
    </div>
  )
}

export default JobFilters
