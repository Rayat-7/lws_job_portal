import React from 'react'
import { useState } from 'react';
import { useApplicants } from './api/useCompany'
const AllApplicants = () => {
     const [filters, setFilters] = useState({ page: 1, limit: 5, status: "new" });
    const {data,isLoading,error}=useApplicants(filters)
      const applicants = data?.data || [];
  return (
    <div>
        <div>
        {isLoading && <p>Loading applicants...</p>}
        {error && <p>Error fetching applicants: {error.message}</p>}
        {/* {data && (
            <p>Found {data.length} applicants</p>
        )} */}
        </div>
        <div>
        {console.log(data)}
        {applicants.map((app) =>(
            <div className='' key={app?.id}>
                <div> {app?.user?.name}</div><br/>
                <div> {app?.user?.email}</div><br/>
                <div> {app?.job?.title}</div><br/>
                <div> {app?.status}</div><br/>
            </div>
        ))}     
        
        </div>
    </div>
  )
}

export default AllApplicants