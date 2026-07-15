import React from 'react'
import { useCompanyProfile } from './api/useCompany';
import { useOpenPositionByslug } from './api/useCompany';

const CompanyProfile = () => {
    const {data:company,loading,error} = useCompanyProfile();
    const {data:jobopening}=useOpenPositionByslug(company?.data?.slug);
    
  return (
    

    <div className="bg-background text-foreground antialiased">
        {/*Header/Navigation */}
        <header
            className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div
                className="container mx-auto flex h-16 items-center justify-between px-4"
            >
                <div className="flex items-center gap-8">
                    <a href="../index.html" className="flex items-center space-x-2">
                        <i
                            data-lucide="briefcase"
                            className="h-8 w-8 text-[hsl(var(--color-primary))]"
                        ></i>
                        <span className="text-xl font-bold">LWS Job Portal</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="../index.html"
                            className="text-sm font-medium transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Jobs</a
                        >
                        <a
                            href="#"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Companies</a
                        >
                        <a
                            href="#"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >About</a
                        >
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <a href="../login.html" className="btn btn-ghost text-sm"
                        >Sign In</a
                    >
                    <a className="btn btn-primary text-sm" href="/create-job">Post a Job</a>
                </div>
            </div>
        </header>

        {/*Main Content */}
        <main className="container mx-auto px-4 py-8">
            {/*Company Header */}
            <div className="card p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/*Company Logo */}
                    <div className="flex-shrink-0">
                        <div
                            className="h-32 w-32 rounded-xl bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <i
                                data-lucide="building-2"
                                className="h-16 w-16 text-[hsl(var(--color-primary))]"
                            ></i>
                        </div>
                    </div>

                    {/*Company Info */}
                    <div className="flex-1 h-full items-center">
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {company?.data?.name || "Company Name"}
                                </h1>
                                <div
                                    className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]"
                                >
                                    <span className="flex items-center gap-1">
                                        <i
                                            data-lucide="building"
                                            className="h-4 w-4"
                                        ></i>
                                        {company?.data?.industry || "Industry"}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <i
                                            data-lucide="map-pin"
                                            className="h-4 w-4"
                                        ></i>
                                        {company?.data?.location || "Location"}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <i
                                            data-lucide="users"
                                            className="h-4 w-4"
                                        ></i>
                                        {company?.data?.employeeCount || "500-1000 employees"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline">
                                    <i
                                        data-lucide="share-2"
                                        className="h-4 w-4 mr-2"
                                    ></i>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/*Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/*About Company */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            About Company
                        </h2>
                        <div
                            className="space-y-4 text-[hsl(var(--color-foreground))]"
                        >
                            <p>
                                {company?.data?.description || "TechCorp is a leading technology company specializing in software development, cloud computing, and AI solutions. Founded in 2010, we have grown to become a trusted partner for businesses worldwide."}
                            </p>
                            <p>
                                Our mission is to empower businesses through
                                innovative technology solutions that drive
                                digital transformation. We work with Fortune 500
                                companies and startups alike, helping them
                                leverage cutting-edge technology to solve
                                complex business challenges.
                            </p>
                           
                        </div>
                    </div>

                    {/*Company Culture & Values */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                    >
                                        <i
                                            data-lucide="lightbulb"
                                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Innovation
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        We encourage creative thinking and
                                        embrace new ideas to solve problems.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                    >
                                        <i
                                            data-lucide="users"
                                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Collaboration
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        Teamwork and open communication are at
                                        the heart of everything we do.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                    >
                                        <i
                                            data-lucide="target"
                                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Excellence
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        We strive for the highest quality in our
                                        products and services.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                    >
                                        <i
                                            data-lucide="heart"
                                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Integrity
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        Honesty and transparency guide our
                                        decisions and actions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Open Positions */}
                    <div className="card p-6" id="jobs">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                Open Positions
                            </h2>
                            <span
                                className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                >15 jobs available</span
                            >
                        </div>
                        <div className="space-y-4">

                            {jobopening?.data?.map((job)=>(
                                <article key={job.id}
                                className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div
                                    className="flex items-start justify-between gap-4 mb-3"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            <a
                                                href="job-details.html"
                                                className="hover:underline"
                                                >{job.title}</a
                                            >
                                        </h3>
                                        <div
                                            className="flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]"
                                        >
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-4 w-4"
                                                ></i>
                                                {job.location}
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="clock"
                                                    className="h-4 w-4"
                                                ></i>
                                                {/* //extract day from createdAt and display it in a human readable format */}
                                               
                                                {(() => {
                                                    const postedDate = new Date(job.createdAt);
                                                    const currentDate = new Date();
                                                    const diffTime = Math.abs(currentDate - postedDate);
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    return `${diffDays} days ago`;
                                                })()}
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="users"
                                                    className="h-4 w-4"
                                                ></i>
                                                {job.applicants} applicants
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-ghost p-2 flex-shrink-0"
                                        title="Save job"
                                    >
                                        <i
                                            data-lucide="bookmark"
                                            className="h-5 w-5"
                                        ></i>
                                    </button>
                                </div>

                                <p
                                    className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3"
                                >
                                   {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    
                                    {job.skills.map((i)=>(
                                    // <span key={i} className="badge badge-secondary"
                                    //     >{i}</span
                                     <span key={i} className="badge badge-secondary">{i}</span>
                                    
                                   ))}
                                    
                                    
                                </div>

                                <div
                                    className="flex items-center justify-between pt-3 border-t border-[hsl(var(--color-border))]"
                                >
                                    <span
                                        className="text-sm font-semibold text-[hsl(var(--color-primary))]"
                                        >${job.salaryMin/1000}k - ${job.salaryMax/1000}k</span
                                    >
                                    <div className="flex gap-2">
                                        <a
                                            href="job-details.html"
                                            className="btn btn-outline text-sm"
                                            >View Details</a
                                        >
                                        <button className="btn btn-primary text-sm">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </article>
                            ))}
                            

                            
                        </div>

                        {/*View All Jobs */}
                        <div className="mt-6 text-center">
                            <a href="../index.html" className="btn btn-outline">
                                View All Open Positions
                                <i
                                    data-lucide="arrow-right"
                                    className="h-4 w-4 ml-2"
                                ></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/*Sidebar Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/*Contact Information */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Information
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <i
                                    data-lucide="globe"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
                                ></i>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1"
                                    >
                                        Website
                                    </p>
                                    <a
                                        href="https://www.techcorp.com"
                                        className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
                                    >
                                        {company?.data?.websiteUrl || "www.techcorp.com"}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <i
                                    data-lucide="mail"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
                                ></i>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1"
                                    >
                                        Email
                                    </p>
                                    <a
                                        href="mailto:careers@techcorp.com"
                                        className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
                                    >
                                        {company?.data?.hrEmail || "careers@techcorp.com"}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <i
                                    data-lucide="phone"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
                                ></i>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1"
                                    >
                                        Phone
                                    </p>
                                    <a
                                        href="tel:+14155551234"
                                        className="text-sm font-medium"
                                    >
                                        +1 (415) 555-1234
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <i
                                    data-lucide="map-pin"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
                                ></i>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1"
                                    >
                                        Headquarters
                                    </p>
                                    <p className="text-sm font-medium">
                                        123 Tech Street<br />
                                        San Francisco, CA 94102<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Social Media */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="space-y-2">
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="linkedin"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >LinkedIn</span
                                >
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="twitter"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium">Twitter</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="facebook"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Facebook</span
                                >
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="instagram"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Instagram</span
                                >
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="github"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium">GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/*Footer */}
        <footer
            className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/30 mt-16"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">LWS Job Portal</h3>
                        <p
                            className="text-sm text-[hsl(var(--color-muted-foreground))]"
                        >
                            Your trusted platform for finding the perfect job or
                            the perfect candidate.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Job Seekers</h4>
                        <ul
                            className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]"
                        >
                            <li>
                                <a
                                    href="../index.html"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Browse Jobs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Companies</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Career Advice</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Salary Guide</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Employers</h4>
                        <ul
                            className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Post a Job</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Browse Candidates</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Pricing</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Hiring Resources</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul
                            className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >About Us</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Contact</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Privacy Policy</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[hsl(var(--color-foreground))]"
                                    >Terms of Service</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className="border-t border-[hsl(var(--color-border))] mt-8 pt-8 text-center text-sm text-[hsl(var(--color-muted-foreground))]"
                >
                    <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script>
            // Initialize Lucide icons
            lucide.createIcons();
        </script>
    </div>


  )
}

export default CompanyProfile