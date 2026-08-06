import React from 'react'
import { useJobs } from './api/useCompany'
const AllPositions = () => {
    const{data,isLoading,error}=useJobs();
    const jobs =data?.data || [];

  return (
    <div>
      <div>
        {isLoading && <p>loadin all the jobs</p> }
        {error && <p>error fetching jobs</p>}
    </div>
    
    <div>AllPositions</div>  
    {console.log(jobs)}
    <div>
        {jobs.map((jobs) =>(
            <div key={jobs.id}>
                <div>{jobs.title}</div>
            </div>
        ))}
    </div>
    </div>
    
  )
}

export default AllPositions