import { Library } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';


const Applied_jobs = () => {
const [jobs,setjobs] =useState([]);
const [hasmore,setHasMore ] =useState(true);
const [page,setPage] =useState(1);
const [loading,setLoading] =useState(false);

const [filters, setFilters] = useState({
  status: "all",       // Under Review, Shortlisted, Rejected
  dateRange: "all"     // last7days, last30days, last3months
});

const [sortOption, setSortOption] = useState("newest");

const fetchJobs = async (pageNum = 1) => {
    setLoading(true);
    try {
        const query = new URLSearchParams({
            limit: 5,
            page: pageNum.toString(),
            sort: sortOption,
            status: filters.status,
            dateRange: filters.dateRange
        });
        const response = await fetch(`http://localhost:5000/api/applications/my-applications?${query.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        
        // CHANGE THIS PART - The API returns {success, count, data}
        // Use data.data instead of data.jobs
        const jobsData = data.data || []; // Access the 'data' array from the response
        
        if (pageNum === 1) {
            setjobs(jobsData); // Changed from data.jobs to jobsData
        } else {
            setjobs((prev) => ([...prev, ...jobsData])); // Changed from data.jobs to jobsData
        }

        // Update hasMore based on count or jobs length
        // If count is provided in the response, use it
        setHasMore(jobsData.length > 0 && (data.count ? jobsData.length < data.count : jobsData.length === 5));
        
    } catch (error) {
        console.error("Error fetching jobs:", error);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    setPage(1);
    fetchJobs(1);
  }, [filters, sortOption]);


const handleFilterChange = (type ,value ) =>{
    setFilters((prev) =>({
        ...prev,
        [type] :value
    }))
}
  return (
    <div className="bg-background text-foreground antialiased">
      {/*Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <a href="../" className="flex items-center space-x-2">
              <i
                data-lucide="briefcase"
                className="h-8 w-8 text-[hsl(var(--color-primary))]"
              ></i>
              <span className="text-xl font-bold">LWS Job Portal</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="../index.html"
                className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
              >
                Jobs
              </a>
              <Link to="/user-dashboard" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                
                className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
              >
                Dashboard
              </Link>
              <a
                href="applied-jobs.html"
                className="text-sm font-medium text-[hsl(var(--color-primary))]"
              >
                My Applications
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <i
                  data-lucide="user"
                  className="h-4 w-4 text-[hsl(var(--color-primary))]"
                ></i>
              </div>
              <span className="text-sm font-medium hidden md:inline">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </header>

      {/*Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/*Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
            <a
              href="user-dashboard.html"
              className="hover:text-[hsl(var(--color-primary))]"
            >
              Dashboard
            </a>
            <i data-lucide="chevron-right" className="h-4 w-4"></i>
            <span className="text-[hsl(var(--color-foreground))]">
              Applied Jobs
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">
                Track all your job applications in one place
              </p>
            </div>
            <div className="text-sm text-[hsl(var(--color-muted-foreground))]">
              <span className="font-medium text-[hsl(var(--color-foreground))]">
                12
              </span>
              applications
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/*Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="font-semibold mb-4">Filters</h2>

              {/*Status Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Application Status</h3>
                {["all", "underReview", "shortlisted", "rejected"].map((status) => (
            <label key={status} className="block">
              <input
                type="radio"
                name="status"
                checked={filters.status === status}
                onChange={() => handleFilterChange("status", status)}
              />
              {status}
            </label>
          ))}
               
              </div>

              {/*Date Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Application Date</h3>
                <div>
                  
                  {["all", "last7days", "last30days", "last3months"].map((range) => (
            <label key={range} className="block">
              <input
                type="radio"
                name="dateRange"
                checked={filters.dateRange === range}
                onChange={() => handleFilterChange("dateRange", range)}
              />
              {range}
            </label>
          ))}
                </div>
              </div>

        <button
          className="btn btn-outline"
          onClick={() => setFilters({ status: "all", dateRange: "all" })}
        >
          Reset Filters
        </button>
            </div>
          </aside>

          {/*Applications List */}
          <div className="lg:col-span-3 space-y-4">
            {/*Sort and View Options */}
             <div className="flex  items-center mb-4">
          <h2 className="text-sm  mr-4">Sort by </h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 p-1 rounded"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

          {jobs.length === 0 ? (
  <p>No jobs found.</p>
) : jobs.map((job)=>(
            <div key={job.id} className='card p-6 hover:shadow-md transition-shadow'>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                            <i data-lucide="building-2" className="h-8 w-8 text-[hsl(var(--color-primary))]"></i>
                            </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">
                                    <a href="job-details.html" className="hover:text-[hsl(var(--color-primary))]">
                                        {job.title}
                                    </a>
                                </h3>
                                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                                    <a href="company-profile.html" className="hover:text-[hsl(var(--color-primary))]">
                                        {job.companyName}
                                    </a>
                                </p>
                            </div>
                            <span className={`badge ${job.status === 'Under Review' ? 'badge-warning' : job.status === 'Shortlisted' ? 'badge-info' : job.status === 'Rejected' ? 'badge-danger' : ''}`}>
                                {job.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                            <span className="flex items-center gap-1">
                                <i data-lucide="map-pin" className="h-4 w-4"></i>
                                {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <i data-lucide="briefcase" className="h-4 w-4"></i>
                                {job.employmentType}
                            </span>
                            <span className="flex items-center gap-1">
                                <i data-lucide="dollar-sign" className="h-4 w-4"></i>
                                {job.salaryRange}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-4 text-xs text-[hsl(var(--color-muted-foreground))]">
                                <span className="flex items-center gap-1">
                                    <i data-lucide="clock" className="h-3 w-3"></i>
                                    Applied on {job.appliedDate}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href="job-details.html" className="btn btn-outline text-sm h-9">
                                    <i data-lucide="eye" className="h-4 w-4 mr-2"></i>
                                    View Job
                                </a>
                                {job.status !== 'Rejected' && (
                                <button className="btn btn-outline text-sm h-9">
                                    <i data-lucide="x" className="h-4 w-4 mr-2"></i>
                                    Withdraw
                                </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ))}

            {/*Load More */}
            {hasmore&& (
                <button className="btn btn-outline block mx-auto"
                disabled={loading}
                onClick={() =>{
                    const nextPage =page+1;
                    setPage(nextPage);
                    fetchJobs(nextPage);
                }}
                className="btn btn-outline block mx-auto"
                >
                    {loading ? 'Loading...' :'Load More'}
                </button>
            )}

            {/*Loading State (Hidden by default) */}
            <div className="hidden space-y-4" id="loadingState">
              <div className="card p-6">
                <div className="flex gap-6">
                  <div className="skeleton h-16 w-16 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="skeleton h-6 w-3/4"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex gap-6">
                  <div className="skeleton h-16 w-16 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="skeleton h-6 w-3/4"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/*Footer */}
      <footer className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">LWS Job Portal</h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                Your trusted platform for finding the perfect job or the perfect
                candidate.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li>
                  <a
                    href="../index.html"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Companies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Career Advice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Salary Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Browse Candidates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Hiring Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[hsl(var(--color-foreground))]"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[hsl(var(--color-border))] mt-8 pt-8 text-center text-sm text-[hsl(var(--color-muted-foreground))]">
            <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
  
}

export default Applied_jobs