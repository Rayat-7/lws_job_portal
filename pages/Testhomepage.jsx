import React, { act, useState } from 'react'
import Headertest from '../src/components/common/Headertest'
import Dropdown from '../src/components/ui/Dropdown'

const API_BASE_URL = 'http://localhost:5000'

const createEmptryFilters=() =>({
  jobType:[],
  experienceLevel:[],
  salaryRange:[],
  skills:[]
})

const EXPERIENCE_LEVEL_API_MAP = {
    'Entry Level': 'Entry',
    'Mid Level': 'Mid',
    'Senior Level': 'Senior',
    'Lead/Principal': 'Lead',
    Director: 'Lead',
}

const SORT_API_MAP = {
    'Most Recent': 'recent',
    'Salary (High to Low)': 'salary_high',
    'Salary (Low to High)': 'salary_low',
}
const formatSalary = (job) => {
    const min = Number(job.salaryMin)
    const max = Number(job.salaryMax)

    if (Number.isNaN(min) && Number.isNaN(max)) {
        return 'Salary not disclosed'
    }

    const toShortSalary = (value) => {
        if (Number.isNaN(value)) return null
        return value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value.toLocaleString()}`
    }

    if (!Number.isNaN(min) && !Number.isNaN(max)) {
        return `${toShortSalary(min)} - ${toShortSalary(max)}`
    }

    if (!Number.isNaN(min)) {
        return `${toShortSalary(min)}+`
    }

    return `Up to ${toShortSalary(max)}`
}


const formatPostedTime = (createdAt) => {
    if (!createdAt) return 'Recently posted'

    const postedDate = new Date(createdAt)
    if (Number.isNaN(postedDate.getTime())) return 'Recently posted'

    const diffInDays = Math.max(0, Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)))

    if (diffInDays === 0) return 'Posted today'
    if (diffInDays === 1) return 'Posted 1 day ago'
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`

    const weeks = Math.floor(diffInDays / 7)
    return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`
}

const getVisiblePages = (currentPage, totalPages) => {
    const maxVisible = 5
    const safeTotalPages = Math.max(1, totalPages)
    const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages)

    let start = Math.max(1, safeCurrentPage - Math.floor(maxVisible / 2))
    const end = Math.min(safeTotalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)

    const pages = []
    for (let page = start; page <= end; page += 1) {
        pages.push(page)
    }
    return pages
}

const Testhomepage = () => {
const [openDropdown,setOpenDropdown]=useState(null)
const {sortOption,setSortOption}= useState('Most Recent')
const [filters,setFilters]=useState(createEmptryFilters())
const [serachTerm,setSearchTerm]=useState('')
const [jobs,setJobs]=useState([])
const [isLoading,setIsLoading]=useState(false)
const [error,setError]=useState(null)
const [currentPage,setCurrentPage]=useState(1)
const [totalJobs,setTotalJobs]=useState(0)
const [totalPages,setTotalPages]=useState(1)
const [appliedSearchTerm,setAppliedSearchTerm]=useState('')
const [appliedFilters,setAppliedFilters]=useState(createEmptryFilters())
const [appliedSortOption,setAppliedSortOption]=useState('Most Recent')

const [isSheetOpen,setIsSheetOpen]=useState(false)

const toggleDropdown =(dropdownId)=>{
  setOpenDropdown((current) => (current === dropdownId ? null : dropdownId))
}

const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const values = prev[category]
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
      return { ...prev, [category]: nextValues }
    })
  }

const buildQueryParams = ({ page, search, activeFilters, activeSort }) => {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('limit', '5')

        if (search.trim()) {
            params.set('search', search.trim())
        }

        if (activeFilters.jobType.length) {
            params.set('type', activeFilters.jobType.join(','))
        }

        if (activeFilters.experienceLevel.length) {
            const mappedLevels = activeFilters.experienceLevel
                .map((level) => EXPERIENCE_LEVEL_API_MAP[level] || level)
                .filter(Boolean)

            if (mappedLevels.length) {
                params.set('experienceLevel', mappedLevels.join(','))
            }
        }

        if (activeFilters.skills.length) {
            params.set('skills', activeFilters.skills.join(','))
        }

        if (activeFilters.salaryRange.length) {
            params.set('salaryRange', activeFilters.salaryRange.join(','))
        }

        params.set('sort', SORT_API_MAP[activeSort] || 'recent')

        return params.toString()
    }

   const fetchJobs = async ({
        page = 1,
        search = appliedSearchTerm,
        activeFilters = appliedFilters,
        activeSort = appliedSortOption,
    } = {}) => {
        try {
            setIsLoading(true)
            setError('')

            const queryString = buildQueryParams({
                page,
                search,
                activeFilters,
                activeSort,
            })

            const response = await fetch(`${API_BASE_URL}/api/jobs?${queryString}`)
            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to load jobs')
            }

            setJobs(result.data || [])
            setCurrentPage(result.currentPage || page)
            setTotalPages(result.totalPages || 1)
            setTotalJobs(result.count || 0)
        } catch (fetchError) {
            setJobs([])
            setError(fetchError.message || 'Failed to load jobs')
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='bg-background text-foreground antialiased'>
      <Headertest/>

      <main className='container mx-auto px-4 py-8'>

         <section className="mb-12">
                <div className="text-center space-y-4">
                    <h1
                        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                    >
                        Find Your Dream Job
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Discover thousands of job opportunities from top
                        companies. Your next career move starts here.
                    </p>
                </div>
            </section>


            <section className='mb-8'>
              <div className='card p-6'>
                <div className='space-y-4'>

                  <form className='flex flex-col md:flex-row gap-4'
                  onSubmit={handleSearch}
                  >
                    <div
                                className="flex-1 ring ring-transparent focus-within:ring-primary rounded-md place-content-center transition-all"
                            >  
                            <div className="relative">
                                    <i
                                        data-lucide="search"
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    ></i>
                                   <input 
                                   type='text'
                                   value={serachTerm}
                                   onChange={(event) => setSearchTerm(event.target.value)}
                                   placeholder='serach jobs by title'
                                   className='input pl-10 w-full outline-none border-none'
                                   />
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary flex gap-2">
                                <i
                                    data-lucide="search"
                                    className="h-4 w-4 mr-2"
                                ></i>
                                Search Jobs
                            </button>
                  </form>
                {/* filter */}
                <div
                            className="flex flex-wrap items-center gap-2 pt-2 border-t border-border"
                        >
                           <button
                                className="btn btn-outline text-xs h-8 px-3 flex items-center md:hidden"
                                onClick={() =>setIsSheetOpen(true)}>
                                  Filters
                                </button>
                            <div className='hidden md:flex flex-wrap items-center gap-2'>
                              <span className='text-sm font-medium text-muted-foreground mr-2'>
                                filters:
                              </span>


                              {/* dropdown */}
                              <Dropdown
                                dropdownName="Job Type"
                                options={['Full-time', 'Part-time', 'Contract', 'Internship']}
                                dropdownId="jobTypeDropdown"
                                openDropdown={openDropdown}
                                toggleDropdown={toggleDropdown}
                                toggleFilter={toggleFilter}
                                filters={filters}
                                category="jobType"
                            />

                            {/*Experience Level Dropdown */}
                            <Dropdown
                                dropdownName="Experience Level"
                                options={['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal']}
                                dropdownId="experienceLevelDropdown"
                                openDropdown={openDropdown}
                                toggleDropdown={toggleDropdown}
                                toggleFilter={toggleFilter}
                                filters={filters}
                                category="experienceLevel"
                            />
                            </div>
                        </div>


                </div>
              </div>
            </section>

             {/*Results Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Available Jobs</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {isLoading ? 'Loading jobs...' : `Showing ${totalJobs.toLocaleString()} result${totalJobs === 1 ? '' : 's'}`}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <div className="dropdown">
                        <button
                            className="btn btn-outline text-sm h-9"
                            onClick={() => toggleDropdown('sortDropdown')}
                        >
                            {sortOption}
                            <i
                                data-lucide="chevron-down"
                                className="ml-2 h-3 w-3"
                            ></i>
                        </button>
                        <div
                            id="sortDropdown"
                            className={`dropdown-content card p-2 ${openDropdown === 'sortDropdown' ? 'show' : ''}`}
                        >
                            <button
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                                onClick={() => selectSort('Most Recent')}
                            >
                                Most Recent
                            </button>

                            <button
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                                onClick={() => selectSort('Salary (High to Low)')}
                            >
                                Salary (High to Low)
                            </button>
                            <button
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                                onClick={() => selectSort('Salary (Low to High)')}
                            >
                                Salary (Low to High)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             {error ? (
                <div className="card p-12 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {error}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            fetchJobs({
                                page: currentPage,
                                search: appliedSearchTerm,
                                activeFilters: appliedFilters,
                                activeSort: appliedSortOption,
                            })
                        }
                    >
                        Retry
                    </button>
                </div>
            ):isLoading && jobs.length ===0?(
              <div className='grid gap-4 md:gap-6'>
                {Array.from({length:5}).map((_,index) =>(
                  <article key={index} className='card p-6 animate-pulse'>
                    <div className="flex flex-col md:flex-row gap-4">
                                <div className="h-16 w-16 rounded-lg bg-muted" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-6 w-1/2 rounded bg-muted" />
                                    <div className="h-4 w-2/3 rounded bg-muted" />
                                    <div className="h-4 w-full rounded bg-muted" />
                                    <div className="flex gap-2">
                                        <div className="h-6 w-20 rounded bg-muted" />
                                        <div className="h-6 w-20 rounded bg-muted" />
                                        <div className="h-6 w-20 rounded bg-muted" />
                                    </div>
                                </div>
                            </div>
                  </article>
                ))}
              </div>
            ):jobs.length > 0 ?(
              <>
              <div className='grid gap-4 md:gap-6'>
                {jobs.map((job)=>{
                  const skills =Array.isArray(job.skills)? job.skills:[]
                  const displaySkills =skills.length  ? skills.slice:[job.type ,jobWorkMode].filter(Boolean)
                  return(
                    <article key={job.id} className="card p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-none">
                                            <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                                                {job.company?.logoUrl ? (
                                                    <img
                                                        src={job.company.logoUrl}
                                                        alt={job.company?.name || 'Company logo'}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <i
                                                        data-lucide="building-2"
                                                        className="h-8 w-8 text-primary"
                                                    ></i>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-1">
                                                        <a
                                                            href={`job-seeker/job-details.html?slug=${job.slug}`}
                                                            className="hover:underline"
                                                        >
                                                            {job.title}
                                                        </a>
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                        <a
                                                            href={`company-profile.html?companyId=${job.companyId}`}
                                                            className="hover:text-primary font-medium"
                                                        >
                                                            {job.company?.name || 'Unknown Company'}
                                                        </a>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <i data-lucide="map-pin" className="h-4 w-4"></i>
                                                            {job.location}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <i data-lucide="clock" className="h-4 w-4"></i>
                                                            {formatPostedTime(job.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {job.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-secondary">{job.type}</span>
                                                <span className="badge badge-outline">{job.workMode}</span>
                                                {displayedSkills.slice(0, 4).map((skill) => (
                                                    <span key={skill} className="badge badge-outline">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-semibold text-primary">
                                                        {formatSalary(job)}
                                                        {job.salaryPeriod ? ` / ${job.salaryPeriod.toLowerCase()}` : ''}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <i data-lucide="users" className="h-4 w-4"></i>
                                                        {job.applicants || 0} applicants
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`job-seeker/job-details.html?slug=${job.slug}`}
                                                        className="btn btn-outline text-sm"
                                                    >
                                                        View Details
                                                    </a>
                                                    <button className="btn btn-primary text-sm" onClick={openApplyDialog}>
                                                        Apply Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                  )
                })}
              </div>

                <div className='mt-12 flex flex-col items-center gap-4'>
                   <div className="flex flex-wrap items-center justify-center gap-2">
                    <button 
                    className='btn btn-outline'
                    onClick={() => handlePageChange(currentPage -1)}
                    disabled={currentPage <=1 || isLoading}
                    >
                      Previous
                    </button>
                  {getVisiblePages(currentPage ,totalPages).map((page)=>(
                    <button
                    key={page}
                    className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    >
                      {page}
                    </button>
                  ))}

                    <button
                    className='btn btn-outline'
                    onClick={() => handlePageChange(currentPage +1)}
                    disabled={currentPage >= totalPages || isLoading}
                    >
                      Next
                    </button>
                     <p className="text-sm text-muted-foreground">
                            Showing {Math.min((currentPage - 1) * 5 + 1, totalJobs)} to {Math.min(currentPage * 5, totalJobs)} of {totalJobs.toLocaleString()} jobs
                        </p>
                   </div>
                </div>

              </>
            ):(
              <div className="card p-12 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters or search terms to find more opportunities.
                    </p>
                    <button className="btn btn-outline" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </div>

            )}
</main>

  {/* Filter Sheet for Mobile */}
        <div className={`fixed inset-0 z-50 md:hidden ${isSheetOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsSheetOpen(false)}></div>
            <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-lg shadow-lg p-6 transform transition-transform duration-300 ease-in-out"
                 style={{ transform: isSheetOpen ? 'translateY(0)' : 'translateY(100%)' }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button onClick={() => setIsSheetOpen(false)} className="btn-ghost p-2">
                        <i data-lucide="x" className="h-5 w-5"></i>
                    </button>
                </div>
                <div className="space-y-6">
                    {/* Job Type */}
                    <div>
                        <h4 className="font-medium mb-2">Job Type</h4>
                        <div className="space-y-2">
                            {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                <label key={type} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-input"
                                           checked={filters.jobType.includes(type)}
                                           onChange={() => toggleFilter('jobType', type)} />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Experience Level */}
                    <div>
                        <h4 className="font-medium mb-2">Experience Level</h4>
                        <div className="space-y-2">
                            {['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'].map(level => (
                                <label key={level} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-input"
                                           checked={filters.experienceLevel.includes(level)}
                                           onChange={() => toggleFilter('experienceLevel', level)} />
                                    <span>{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Salary Range */}
                    <div>
                        <h4 className="font-medium mb-2">Salary Range</h4>
                        <div className="space-y-2">
                            {['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'].map(range => (
                                <label key={range} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-input"
                                           checked={filters.salaryRange.includes(range)}
                                           onChange={() => toggleFilter('salaryRange', range)} />
                                    <span>{range}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Skills */}
                    <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="space-y-2">
                            {['React', 'Node.js', 'Python', 'TypeScript'].map(skill => (
                                <label key={skill} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-input"
                                           checked={filters.skills.includes(skill)}
                                           onChange={() => toggleFilter('skills', skill)} />
                                    <span>{skill}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex gap-4">
                    <button onClick={clearFilters} className="btn btn-outline flex-1">Clear All</button>
                    <button onClick={handleSearch} className="btn btn-primary flex-1">Apply Filters</button>
                </div>
            </div>
        </div>

        {/*Apply Job Dialog */}
        <div
            id="applyDialog"
            className="hidden fixed inset-0 bg-black/50 z-50 items-center justify-center p-4"
        >
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/*Dialog Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Apply for Position
                            </h2>
                            <p
                                className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1"
                            >
                                Complete the form below to submit your
                                application
                            </p>
                        </div>
                        <button
                            onClick={() => closeApplyDialog()}
                            className="btn-ghost p-2"
                        >
                            <i data-lucide="x" className="h-5 w-5"></i>
                        </button>
                    </div>

                    {/*Resume Upload Section */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">
                            Resume <span className="text-red-500">*</span>
                        </label>

                        {/*Upload Area (shown when no file) */}
                        <div
                            id="uploadArea"
                            className="border-2 border-dashed border-[hsl(var(--color-border))] rounded-lg p-8 text-center hover:border-[hsl(var(--color-primary))] transition-colors cursor-pointer"
                        >
                            <input
                                type="file"
                                id="resumeInput"
                                accept=".pdf"
                                className="hidden"
                                onChange={(event) => handleFileUpload(event)}
                            />
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                >
                                    <i
                                        data-lucide="upload"
                                        className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Click to upload resume
                                    </p>
                                    <p
                                        className="text-xs text-[hsl(var(--color-muted-foreground))] mt-1"
                                    >
                                        PDF file only (Max 5MB)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/*File Preview Area (shown when file uploaded) */}
                        <div
                            id="filePreview"
                            className="hidden border border-[hsl(var(--color-border))] rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                    >
                                        <i
                                            data-lucide="file-text"
                                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                    <div>
                                        <p
                                            id="fileName"
                                            className="text-sm font-medium"
                                        ></p>
                                        <p
                                            id="fileSize"
                                            className="text-xs text-[hsl(var(--color-muted-foreground))]"
                                        ></p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => reuploadFile()}
                                        className="btn btn-outline text-xs h-8 px-3"
                                    >
                                        <i
                                            data-lucide="upload"
                                            className="h-3 w-3 mr-1"
                                        ></i>
                                        Reupload
                                    </button>
                                    <button
                                        onClick={() => removeFile()}
                                        className="btn btn-outline text-xs h-8 px-3 text-red-600 hover:bg-red-50"
                                    >
                                        <i
                                            data-lucide="trash-2"
                                            className="h-3 w-3 mr-1"
                                        ></i>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Cover Message Section */}
                    <div className="space-y-3">
                        <label for="coverMessage" className="text-sm font-medium">
                            Cover Message
                            <span
                                className="text-[hsl(var(--color-muted-foreground))]"
                                >(Optional)</span
                            >
                        </label>
                        <textarea
                            id="coverMessage"
                            rows="5"
                            className="input resize-none"
                            placeholder="Write a brief message about why you're a great fit for this role..."
                        ></textarea>
                        <p
                            className="text-xs text-[hsl(var(--color-muted-foreground))]"
                        >
                            <span id="charCount">0</span>/500 characters
                        </p>
                    </div>

                    {/*Action Buttons */}
                    <div
                        className="flex gap-3 pt-4 border-t border-[hsl(var(--color-border))]"
                    >
                        <button
                            onClick={() => closeApplyDialog()}
                            className="btn btn-outline flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => submitApplication()}
                            className="btn btn-primary flex-1"
                        >
                            <i data-lucide="send" className="h-4 w-4 mr-2"></i>
                            Submit Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testhomepage