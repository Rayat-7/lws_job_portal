import React from 'react'
import CompanyHeader from './CompanyHeader'
import { useCompanyProfile, useDashboardStats,useJobs ,useApplicants} from './api/useCompany'
import { useState } from 'react'

const CompanyDashboard = () => {
   const [filters, setFilters] = useState({ page: 1, limit: 5, status: "new" });
  const { data, isLoading, error } = useApplicants(filters);
  const [visibleCount,setVisibleCount]=useState();
  const{data:companydata}=useCompanyProfile();
  const {data:stats,isLoading:statLoading,error:staterror}=useDashboardStats();
  const {data:companyjobs,isLoading:jobLoading,error:jobserror}=useJobs();

  // if (isLoading) return <p>Loading applicants...</p>;
  // if (error) return <p>Error loading applicants</p>;

  const applicants = data?.data || [];

  const jobs=companyjobs?.data||[];
  const visibleJobs= jobs.slice(0,visibleCount)
;
  return (
    <div className="bg-background text-foreground antialiased">
      {/*Header/Navigation */}
      <CompanyHeader />

      {/*Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/*Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {companydata?.data.name}! 👋
          </h1>
          <p className="text-[hsl(var(--color-muted-foreground))]">
            Here's what's happening with your job postings today
          </p>
        </div>

        {/*Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/*Stat Card 1 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <i
                  data-lucide="briefcase"
                  className="h-6 w-6 text-blue-600"
                ></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {stats?.data.activeJobs}
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Active Jobs
            </p>
          </div>

          {/*Stat Card 2 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <i data-lucide="users" className="h-6 w-6 text-green-600"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {stats?.data.totalApplicants}
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Total Applicants
            </p>
          </div>

          {/*Stat Card 3 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <i data-lucide="clock" className="h-6 w-6 text-yellow-600"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {stats?.data.pendingReviews}
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Pending Reviews
            </p>
          </div>

          {/*Stat Card 4 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <i data-lucide="star" className="h-6 w-6 text-purple-600"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {stats?.data.shortLists}
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Shortlisted
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/*Recent Jobs */}
            <div className="card">
              <div className="p-6 border-b border-[hsl(var(--color-border))]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Job Posts</h2>
                  <a
                    href="#"
                    className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[hsl(var(--color-border))]">
                {visibleJobs.map((jobs) => (
                  <ul key={jobs.id}>
                    <div className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            <a
                              href="#"
                              className="hover:text-[hsl(var(--color-primary))]"
                            >
                              {jobs.title}
                            </a>
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                            <span className="flex items-center gap-1">
                              <i data-lucide="map-pin" className="h-3 w-3"></i>
                              {jobs.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <i
                                data-lucide="briefcase"
                                className="h-3 w-3"
                              ></i>
                              {jobs.employment_type}
                            </span>
                            <span className="flex items-center gap-1">
                              <i data-lucide="clock" className="h-3 w-3"></i>
                              {jobs.posted_date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[hsl(var(--color-muted-foreground))]">
                            <span className="font-semibold text-[hsl(var(--color-foreground))]">
                              {jobs.applicants}{" "}
                            </span>
                            applicants
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn btn-outline text-xs h-8">
                            <i data-lucide="eye" className="h-3 w-3 mr-1"></i>
                            View
                          </button>
                          <button className="btn btn-outline text-xs h-8">
                            <i data-lucide="edit" className="h-3 w-3 mr-1"></i>
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </ul>
                ))}
                {visibleCount < jobs.length && (
                <button onClick={() => setVisibleCount((prev) => prev + 5)}>
                  See More
                </button>
              )}
              </div>
              
            </div>

            {/*Recent Applicants */}
            <div className="card">
              <div className="p-6 border-b border-[hsl(var(--color-border))]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Applicants</h2>
                  <a
                    href="#"
                    className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[hsl(var(--color-border))]">

              {applicants.map((app)=>(
                <div key={app.id} className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
                      <i
                        data-lucide="user"
                        className="h-6 w-6 text-[hsl(var(--color-primary))]"
                      ></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">{app?.user.name}</h3>
                          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                            Applied for
                            <span className="font-medium text-[hsl(var(--color-foreground))]">
                              {app.job.title}
                            </span>
                          </p>
                        </div>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                          {new Date(app.applied_date).toLocaleDateString()}
                        </span>
                      </div>
                      {/* <div className="flex flex-wrap items-center gap-2 mb-3">
                        {app.skills.map((skill,index)=>(
                          <span key={index} className="badge badge-secondary">{skill}</span>
                        ))}
                      </div> */}
                      <div className="flex items-center gap-2">
                        <button className="btn btn-primary text-xs h-8">
                          <i data-lucide="check" className="h-3 w-3 mr-1"></i>
                          Shortlist
                        </button>
                        <button className="btn btn-outline text-xs h-8">
                          <i data-lucide="eye" className="h-3 w-3 mr-1"></i>
                          View Profile
                        </button>
                        <button className="btn btn-outline text-xs h-8">
                          <i
                            data-lucide="download"
                            className="h-3 w-3 mr-1"
                          ></i>
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                {/*Applicant 1 */}
                

              </div>
            </div>
          </div>

          {/*Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            {/*Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <a href="/create-job" className="btn btn-primary w-full justify-start">
                  <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
                  Post New Job
                </a>
                <a href="/manage-job" className="btn btn-outline w-full justify-start">
                  <i data-lucide="list" className="h-4 w-4 mr-2"></i>
                  Manage Jobs
                </a>
                <a href="/applicants" className="btn btn-outline w-full justify-start">
                  <i data-lucide="users" className="h-4 w-4 mr-2"></i>
                  View Applicants
                </a>
                <a href="/company-settings" className="btn btn-outline w-full justify-start">
                  <i data-lucide="settings" className="h-4 w-4 mr-2"></i>
                  Company Settings
                </a>
              </div>
            </div>

            {/*Tips Card */}
            <div className="card p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="lightbulb" className="h-5 w-5 text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-900">Pro Tip</h4>
                  <p className="text-sm text-blue-800">
                    Jobs with detailed descriptions get 40% more quality
                    applicants. Keep your postings updated!
                  </p>
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

      {/* <script>
            // Initialize Lucide icons
            lucide.createIcons();
        </script> */}
    </div>
  );
}

export default CompanyDashboard