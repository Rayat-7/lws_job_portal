
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