import React from 'react'
import { useParams } from 'react-router-dom'
import { usegetJobById } from './api/useCompany'
import { useState } from 'react'
// import {useUpdateJob} from './api/useCompany'

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Mutation hook
export const useUpdateJob = () => {
  return useMutation({
    mutationFn: async (updatedJob) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/jobs/${updatedJob.id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
};
const Editjob = ({job,onClose}) => {
  // const { jobId } = useParams();
  // const { data: job } = usegetJobById(jobId);
  const [formData,setFormData]=useState({...job})
  console.log(job);
  const updateJob = useUpdateJob('jobId');

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    updateJob.mutate(formData, {
      onSuccess: () => {
        alert("Job updated successfully!");
        onClose();
      },
      onError: () => {
        alert("Failed to update job.");
      },
    });
  };

  return (
    <div className='fixed scroll-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Edit Job</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex justify-end'>
            <p className="font-bold ">Title</p>
            <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 w-full"
          />
          <p className="font-bold ">Slug</p>
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="border p-2 w-full"
          />
          <p className="font-bold ">Type</p>
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Job Type"
            className="border p-2 w-full"
          />
          <div>
            <p className="font-bold ">Work Mode</p>
             <input
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            placeholder="Work Mode"
            className="border p-2 w-full"
          />
          </div>

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="salaryMin"
            value={formData.salaryMin}
            onChange={handleChange}
            placeholder="Minimum Salary"
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="salaryMax"
            value={formData.salaryMax}
            onChange={handleChange}
            placeholder="Maximum Salary"
            className="border p-2 w-full"
          />
          <input
            name="salaryPeriod"
            value={formData.salaryPeriod}
            onChange={handleChange}
            placeholder="Salary Period"
            className="border p-2 w-full"
          />
          </div>
         
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 w-full"
          />
          <input
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            placeholder="Experience Level"
            className="border p-2 w-full"
          />
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements"
            className="border p-2 w-full"
          />
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Benefits"
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline?.slice(0, 10)}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            placeholder="Vacancies"
            className="border p-2 w-full"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Active">Active</option>
              <option value="Closed">Closed</option>,
          </select>
          
          
            <input
            name="skills"
            value={formData.skills.join(", ")}
            onChange={(e)=>
              setFormData((prevData) => ({
                ...prevData,
                skills: e.target.value.split(",").map((skill) => skill.trim()),
              }))
            }
             placeholder="Skills (comma separated)"
             className="border p-2 w-full"
          />

          <div className="flex justify-end gap-2 mt-4">
           <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editjob