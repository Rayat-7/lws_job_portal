import React, { useMemo, useState } from 'react'
import { useJobs,useUpdateJob,useDeleteJob } from './api/useCompany'
import {Link,useNavigate} from 'react-router-dom'
import Editjob from './Editjob'
//icon import
// import { Lucide } from '@/base-components'

const statusOptions = ['all', 'active', 'closed', 'archived']
const sortOptions = ['newest', 'oldest']
const itemsPerPage = 2

const ManageJob = () => {
    const { data: jobs, isLoading, isError, error } = useJobs()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('newest')
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
      const deleteJobMutation = useDeleteJob();

    const deleteJob = (jobId) => {
        console.log("Delete job with ID:", jobId);
        // Implement your delete logic here, e.g., call an API to delete the job
        deleteJobMutation.mutate(jobId);


    }
    const handleEditjob = (job) => {
        console.log("Edit job with ID:", job);
    }
    

    const allJobs = useMemo(() => jobs?.data || [], [jobs])

    const filteredJobs = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        return [...allJobs]
            .filter((job) => {
                const searchableText = [job.title, job.location, job.type, job.category, job.status]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()

                const matchesSearch = normalizedSearch ? searchableText.includes(normalizedSearch) : true
                const matchesStatus = statusFilter === 'all' ? true : (job.status || '').toLowerCase() === statusFilter

                return matchesSearch && matchesStatus
            })
            .sort((leftJob, rightJob) => {
                const leftDate = new Date(leftJob.createdAt || 0).getTime()
                const rightDate = new Date(rightJob.createdAt || 0).getTime()
                return sortOrder === 'oldest' ? leftDate - rightDate : rightDate - leftDate
            })
    }, [allJobs, searchTerm, statusFilter, sortOrder])

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const pageStart = (safeCurrentPage - 1) * itemsPerPage
    const paginatedJobs = filteredJobs.slice(pageStart, pageStart + itemsPerPage)
    const startItem = filteredJobs.length === 0 ? 0 : pageStart + 1
    const endItem = Math.min(pageStart + itemsPerPage, filteredJobs.length)

    const pageNumbers = []
    for (let page = Math.max(1, safeCurrentPage - 2); page <= Math.min(totalPages, safeCurrentPage + 2); page += 1) {
        pageNumbers.push(page)
    }

    const updateSearchTerm = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const updateStatusFilter = (value) => {
        setStatusFilter(value)
        setCurrentPage(1)
    }

    const updateSortOrder = (value) => {
        setSortOrder(value)
        setCurrentPage(1)
    }

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages))
    }

    return (
        <div className="bg-background text-foreground antialiased">
            <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <a href="../index.html" className="flex items-center space-x-2">
                            <i data-lucide="briefcase" className="h-8 w-8 text-[hsl(var(--color-primary))]"></i>
                            <span className="text-xl font-bold">LWS Job Portal</span>
                        </a>
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="company-dashboard.html" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">Dashboard</a>
                            <a href="manage-jobs.html" className="text-sm font-medium text-[hsl(var(--color-primary))]">Manage Jobs</a>
                            <a href="#" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">Applicants</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="create-job.html" className="btn btn-primary">
                            <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
                            Post Job
                        </a>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                                <i data-lucide="building-2" className="h-4 w-4 text-[hsl(var(--color-primary))]"></i>
                            </div>
                            <span className="text-sm font-medium hidden md:inline">TechCorp Solutions</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                        <a href="company-dashboard.html" className="hover:text-[hsl(var(--color-primary))]">Dashboard</a>
                        <i data-lucide="chevron-right" className="h-4 w-4"></i>
                        <span className="text-[hsl(var(--color-foreground))]">Manage Jobs</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
                            <p className="text-[hsl(var(--color-muted-foreground))]">View and manage all your job postings</p>
                        </div>
                        <a href="create-job.html" className="btn btn-primary">
                            <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
                            Create New Job
                        </a>
                    </div>
                </div>

                <div className="card p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <i data-lucide="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]"></i>
                                <input
                                    type="search"
                                    placeholder="Search jobs by title, location..."
                                    className="input pl-10"
                                    value={searchTerm}
                                    onChange={updateSearchTerm}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <details className="relative group">
                                <summary className="btn btn-outline list-none cursor-pointer">
                                    <i data-lucide="filter" className="h-4 w-4 mr-2"></i>
                                    {statusFilter === 'all' ? 'All Status' : statusFilter[0].toUpperCase() + statusFilter.slice(1)}
                                    <i data-lucide="chevron-down" className="h-4 w-4 ml-2"></i>
                                </summary>
                                <div className="absolute top-full right-0 mt-2 w-48 card p-2 shadow-lg z-10">
                                    {statusOptions.map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => updateStatusFilter(status)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))] ${statusFilter === status ? 'bg-[hsl(var(--color-accent))]' : ''}`}
                                        >
                                            {status === 'all' ? 'All Status' : status[0].toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </details>

                            <details className="relative group">
                                <summary className="btn btn-outline list-none cursor-pointer">
                                    <i data-lucide="arrow-up-down" className="h-4 w-4 mr-2"></i>
                                    {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                                    <i data-lucide="chevron-down" className="h-4 w-4 ml-2"></i>
                                </summary>
                                <div className="absolute top-full right-0 mt-2 w-48 card p-2 shadow-lg z-10">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => updateSortOrder(option)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))] ${sortOrder === option ? 'bg-[hsl(var(--color-accent))]' : ''}`}
                                        >
                                            {option === 'newest' ? 'Newest First' : 'Oldest First'}
                                        </button>
                                    ))}
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[hsl(var(--color-muted))] border-b border-[hsl(var(--color-border))]">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-medium">
                                        <input type="checkbox" className="rounded border-[hsl(var(--color-input))]" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-medium">Job Title</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium">Status</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium">Applicants</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium">Posted Date</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium">Expires</th>
                                    <th className="text-right py-4 px-6 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[hsl(var(--color-border))]">
                                {isLoading ? (
                                    <tr>
                                        <td className="py-8 px-6 text-center text-sm text-[hsl(var(--color-muted-foreground))]" colSpan="7">Loading jobs...</td>
                                    </tr>
                                ) : isError ? (
                                    <tr>
                                        <td className="py-8 px-6 text-center text-sm text-red-500" colSpan="7">
                                            {error?.message || 'Failed to load jobs.'}
                                        </td>
                                    </tr>
                                ) : paginatedJobs.length > 0 ? (
                                    paginatedJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-[hsl(var(--color-accent))] transition-colors">
                                            <td className="py-4 px-6">
                                                <input type="checkbox" className="rounded border-[hsl(var(--color-input))]" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <a href="job-details.html" className="font-medium hover:text-[hsl(var(--color-primary))]">{job.title}</a>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--color-muted-foreground))]">
                                                        <span className="flex items-center gap-1">
                                                            <i data-lucide="map-pin" className="h-3 w-3"></i>
                                                            {job?.location || 'Remote'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <i data-lucide="briefcase" className="h-3 w-3"></i>
                                                            {job?.type || 'Full-time'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`badge ${job?.status === 'Closed' || job?.status === 'Archived' ? 'badge-secondary' : 'badge-success'}`}>
                                                    {job?.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-medium">{job?.applicants || 0}</span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">
                                                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">
                                                {job.deadline ? new Date(job.deadline).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={()=>setSelectedJob(job)} className="btn-ghost p-2 text-blue-600" title="Edit" type="button">
                                                        Edit
                                                    </button>
                                                    <button  onClick={()=>deleteJob(job.id)} className="btn-ghost p-2 text-red-600" title="Delete" type="button">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-8 px-6 text-center text-sm text-[hsl(var(--color-muted-foreground))]" colSpan="7">
                                            No jobs found for the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="hidden p-4 bg-[hsl(var(--color-accent))] border-t border-[hsl(var(--color-border))]" id="bulkActionsBar">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                <span id="selectedCount">0</span> jobs selected
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-outline text-sm h-9" type="button">
                                    <i data-lucide="pause-circle" className="h-3 w-3 mr-2"></i>
                                    Deactivate
                                </button>
                                <button className="btn btn-outline text-sm h-9" type="button">
                                    <i data-lucide="play-circle" className="h-3 w-3 mr-2"></i>
                                    Activate
                                </button>
                                <button className="btn btn-outline text-sm h-9 text-red-600" type="button">
                                    <i data-lucide="trash-2" className="h-3 w-3 mr-2"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-[hsl(var(--color-border))]">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{filteredJobs.length}</span> jobs
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <button className="btn btn-outline h-9 px-3" type="button" disabled={safeCurrentPage === 1} onClick={() => goToPage(safeCurrentPage - 1)}>
                                    <i data-lucide="chevron-left" className="h-4 w-4"></i>
                                </button>
                                {pageNumbers.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={pageNumber === safeCurrentPage ? 'btn btn-primary h-9 px-3' : 'btn btn-outline h-9 px-3'}
                                        onClick={() => goToPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button className="btn btn-outline h-9 px-3" type="button" disabled={safeCurrentPage === totalPages} onClick={() => goToPage(safeCurrentPage + 1)}>
                                    <i data-lucide="chevron-right" className="h-4 w-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/30 mt-16">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">LWS Job Portal</h3>
                            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Your trusted platform for finding the perfect job or the perfect candidate.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Job Seekers</h4>
                            <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                                <li><a href="../index.html" className="hover:text-[hsl(var(--color-foreground))]">Browse Jobs</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Companies</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Career Advice</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Salary Guide</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Employers</h4>
                            <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Post a Job</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Browse Candidates</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Pricing</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Hiring Resources</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">About Us</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Contact</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-[hsl(var(--color-border))] mt-8 pt-8 text-center text-sm text-[hsl(var(--color-muted-foreground))]">
                        <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            {selectedJob && (
                <Editjob className="p-4 absolute bg-blue-400" job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    )
}

export default ManageJob




