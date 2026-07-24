import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    fetchCompanyProfile,
    fetchDashboardStats, 
    fetchJobs,
    fetchApplicants ,
    openPositionByslug,
    postJob,
    getJobById,
    updateJob,
    deleteJob
} from "./companyapi";

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
export const useOpenPositionByslug=(slug)=>{
    return useQuery({
        queryKey:["jobopening",slug],
        queryFn:()=>openPositionByslug(slug)
    })
}
export const usePostJob =()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:postJob,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['companyjobs'] })
        }
    })
}

export const useUpdateJob =(jobId)=>{
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:(updatedJobaData)=>updateJob(jobId,updatedJobaData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['companyjobs']})
        }
    })
}
export const useDeleteJob =()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(jobId)=>deleteJob(jobId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['companyjobs']})
        }

    })
}
export const usegetJobById=(jobId)=>{
    return useQuery({
        queryKey:["job",jobId],
        queryFn:()=>getJobById(jobId)
    })
}