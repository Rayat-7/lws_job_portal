import { useQuery } from "@tanstack/react-query";
import { fetchCompanyProfile,fetchDashboardStats, fetchJobs,fetchApplicants } from "./companyapi";

export  const useCompanyProfile= ()=>{
    return useQuery({
        queryKey:["companyProfile"],
        queryFn:fetchCompanyProfile
    });
}

export const useDashboardStats =() =>{
    return useQuery({
        queryKey:["dashboardStats"],
        queryFn:fetchDashboardStats
    });
}

export const useJobs =()=>{
    return useQuery({
        queryKey:["companyjobs"],
        queryFn:fetchJobs
    })
}

export const useApplicants=(filters) =>{
    return useQuery({
        queryKey:["applicants",filters],
        queryFn:()=>fetchApplicants(filters),
        keepPreviousData:true,
    })
}