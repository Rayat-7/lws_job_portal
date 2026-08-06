
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/companies";

export const fetchCompanyProfile = async () =>{
    const token = localStorage.getItem("token");
    const {data:companydata} = await axios.get(`${BASE_URL}/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return companydata;
}

export const fetchDashboardStats= async ()=>{
    const token =localStorage.getItem("token");
    const {data:dahsboardStats} =await axios.get(`${BASE_URL}/dashboard/stats`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return dahsboardStats;

}

export const fetchJobs =async()=>{
    const token = localStorage.getItem("token");
    const {data:jobs}=await axios.get(`${BASE_URL}/jobs`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return jobs;
}


export const fetchApplicants = async (filters={}) => {
  const token = localStorage.getItem("token");
  const { data:applicants } = await axios.get(`${BASE_URL}/applicants`, {
    headers: { Authorization: `Bearer ${token}` },
    params:filters
  });
  return applicants;
};

export const openPositionByslug= async (slug) => {
    const token = localStorage.getItem("token");
    const {data:openPositionsByslug} =await axios.get(`${BASE_URL}/${slug}/jobs`,{
        headers:{
            Authorization:`Bearer ${token}`}

        })
    

    return openPositionsByslug
}

export const postJob =async (jobData)=>{
    const token =localStorage.getItem("token");
    const {data:postedJob}=await axios.post(`http://localhost:5000/api/jobs`,jobData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return postedJob;
}

export const updateJob=async(jobData)=>{
    const token= localStorage.storage.getItem("token");
    const {data:postedJob} =await axios.post(`http://localhost:5000/api/jobs/${jobId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return updatedJob;

}

export const deleteJob=async(jobId)=>{
    const token =localStorage.getItem("token");
    const {data:deletedJob} =await axios.delete(`http://localhost:5000/api/jobs/${jobId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return deletedJob;
}
export const getJobById=async(jobId)=>{
    const token =localStorage.getItem("token");
    const {data} =await axios.get(`http://localhost:5000/api/jobs/${jobId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return data;
}

// export const getAllApplicants= async()