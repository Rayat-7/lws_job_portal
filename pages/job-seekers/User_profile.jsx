import React, { useState, useRef, useEffect } from 'react'
import { useUser } from '../../src/context/useUser'
import { useUploadResume } from './api/useUser';
const User_profile = () => {
    const user = useUser();
    console.log('User from context:', user?.data?.name);
    if (!user) return <p>Loading...</p>;

    const [resumeName, setResumeName] = useState(user?.data?.resumeOriginalName || 'No resume uploaded');
    const [uploading, setUploading] = useState(false);
    const resumeInputRef = useRef(null);
    const uploadMutation = useUploadResume();

    useEffect(() => {
        if (user?.data?.resumeOriginalName) setResumeName(user.data.resumeOriginalName);
    }, [user]);

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid PDF, DOC, or DOCX file');
            e.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            e.target.value = '';
            return;
        }

        setUploading(true);

        uploadMutation.mutate({ file }, {
            onSuccess: (res) => {
                setUploading(false);
                const name = res?.data?.resumeOriginalName || file.name;
                setResumeName(name);
                if (resumeInputRef.current) resumeInputRef.current.value = '';
                alert('Resume uploaded successfully');
            },
            onError: (err) => {
                setUploading(false);
                alert('Upload failed: ' + (err?.response?.data?.message || err.message || 'Unknown'));
            },
        });
    };

//     function formatDate(dateString) {
//   if (!dateString) return "Present"; // handle ongoing jobs
//   const options = { year: "numeric", month: "short" }; // e.g. Jan 2010
//   return new Date(dateString).toLocaleDateString("en-US", options);
// }

     function formatDate(dateString){
        if(!dateString) return "Present";
        const options ={year:"numeric",month:"short"};
        return new Date(dateString).toLocaleDateString("en-US",options)
     }
    // const fetch
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
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Jobs</a
                        >
                        <a
                            href="user-dashboard.html"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Dashboard</a
                        >
                        <a
                            href="#"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >My Applications</a
                        >
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <i
                                data-lucide="user"
                                className="h-4 w-4 text-[hsl(var(--color-primary))]"
                            ></i>
                        </div>
                        <span className="text-sm font-medium hidden md:inline"
                            >{user?.data?.name}</span
                        >
                    </div>
                </div>
            </div>
        </header>

        {/*Main Content */}
        <main className="container mx-auto px-4 py-8">
            {/*Profile Header */}
            <div className="card p-8 mb-8">
                <div
                    className="flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                    {/*Profile Photo */}
                    <div className="relative flex-shrink-0">
                        <div
                            className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <i
                                data-lucide="user"
                                className="h-16 w-16 text-[hsl(var(--color-primary))]"
                            ></i>
                        </div>
                        <div
                            className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white"
                        >
                            <i
                                data-lucide="camera"
                                className="h-5 w-5 text-white"
                            ></i>
                        </div>
                    </div>

                    {/*Profile Info */}
                    <div className="flex-1">
                        <div
                            className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3"
                        >
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {user?.data?.name}
                                </h1>
                                <p
                                    className="text-lg text-[hsl(var(--color-muted-foreground))] mb-2"
                                >
                                   {user?.data?.title || 'Aspiring Software Engineer'}
                                </p>
                                <div
                                    className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]"
                                >
                                    <span className="flex items-center gap-1">
                                        <i
                                            data-lucide="map-pin"
                                            className="h-4 w-4"
                                        ></i>
                                        {user?.data?.location || 'San Francisco, CA'}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <i
                                            data-lucide="calendar"
                                            className="h-4 w-4"
                                        ></i>
                                        Member since Jan 2024
                                    </span>
                                </div>
                            </div>
                            <a
                                href="edit-user-profile.html"
                                className="btn btn-primary"
                            >
                                <i data-lucide="edit" className="h-4 w-4 mr-2"></i>
                                Edit Profile
                            </a>
                        </div>

                        {/*Quick Stats */}
                        <div
                            className="grid grid-cols-3 gap-4 pt-4 border-t border-[hsl(var(--color-border))]"
                        >
                            <div>
                                <p
                                    className="text-2xl font-bold text-[hsl(var(--color-primary))]"
                                >
                                    12
                                </p>
                                <p
                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                >
                                    Applications
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-2xl font-bold text-[hsl(var(--color-primary))]"
                                >
                                    5
                                </p>
                                <p
                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                >
                                    In Review
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-2xl font-bold text-[hsl(var(--color-primary))]"
                                >
                                    18
                                </p>
                                <p
                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                >
                                    Saved Jobs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/*Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/*About */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p
                            className="text-[hsl(var(--color-foreground))] leading-relaxed"
                        >
                            {user?.data?.bio ||
                                'Passionate software developer with a strong foundation in full stack development. Experienced in building scalable web applications using modern technologies. Eager to contribute to innovative projects and grow as a developer.'}
                        </p>
                    </div>

                    {/*Contact Information */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0"
                                >
                                    <i
                                        data-lucide="mail"
                                        className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        Email
                                    </p>
                                    <p className="font-medium">
                                        {user?.data?.email || 'john.doe@example.com'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div
                                    className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0"
                                >
                                    <i
                                        data-lucide="phone"
                                        className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        Phone
                                    </p>
                                    <p className="font-medium">
                                        {user?.data?.phone || '+1 (415) 555-0123'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div
                                    className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0"
                                >
                                    <i
                                        data-lucide="map-pin"
                                        className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        Location
                                    </p>
                                    <p className="font-medium">
                                        {user?.data?.location || 'San Francisco, CA 94102'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div
                                    className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0"
                                >
                                    <i
                                        data-lucide="linkedin"
                                        className="h-5 w-5 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        LinkedIn
                                    </p>
                                    <a
                                        href={user?.data?.linkedin || '#'}
                                        className="font-medium text-[hsl(var(--color-primary))] hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {user?.data?.linkedin || 'linkedin.com/in/johndoe'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Skills */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">

                           {user.data.skills.map((skill)=>(
                            <span key={skill} className="badge badge-secondary">{skill}</span>
                           ))} 
                            
                        </div>
                    </div>

                    {/*Experience */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {/*Experience 1 */}
                            {user.data.experience.map((jobs) =>(
                                <div key={jobs}
                                className="relative pl-8 pb-6 border-l-2 border-[hsl(var(--color-border))] last:pb-0"
                            >
                                <div
                                    className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-[hsl(var(--color-primary))] border-2 border-white"
                                ></div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        {jobs.title}
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2"
                                    >
                                        {jobs.companyName}
                                    </p>
                                    <p
                                        className="text-xs text-[hsl(var(--color-muted-foreground))] mb-3"
                                    >
                                        {formatDate(jobs.startDate)}-{formatDate(jobs.endDate)}
                                    </p>
                                    <p
                                        className="text-sm text-[hsl(var(--color-foreground))]"
                                    >
                                       {jobs.description}
                                    </p>
                                </div>
                            </div>
                            ))}
                            

                            
                        </div>
                    </div>

                    {/*Education */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">Education</h2>
                        {user.data.education.map((edu)=>(
                            <div key={edu} className="space-y-4">
                            <div className="flex gap-4">
                                <div
                                    className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0"
                                >
                                    <i
                                        data-lucide="graduation-cap"
                                        className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                    ></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        {edu.degree} 
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1"
                                    >
                                        {edu.schoolName}
                                    </p>
                                    <p
                                        className="text-xs text-[hsl(var(--color-muted-foreground))]"
                                    >
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        ))}
                        
                    </div>
                </div>

                {/*Sidebar Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/*Resume */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">Resume</h3>
                        <div className="space-y-4">
                            <div
                                className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg"
                            >
                                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0"
                                    >
                                        <i
                                            data-lucide="file-text"
                                            className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                        ></i>
                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">
                                                            {resumeName}
                                                        </p>
                                                        <p
                                                            className="text-xs text-[hsl(var(--color-muted-foreground))]"
                                                        >
                                                            {user?.data?.resumeUploadDate ? new Date(user.data.resumeUploadDate).toLocaleDateString() : 'Not uploaded'}
                                                        </p>
                                                    </div>
                                </div>
                                <div className="flex gap-2">
                                                    <a
                                                        href={user?.data?.resumeUrl || '#'}
                                                        className="btn btn-outline w-full text-xs h-9"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i
                                                            data-lucide="download"
                                                            className="h-3 w-3 mr-2"
                                                        ></i>
                                                        Download
                                                    </a>
                                </div>
                            </div>
                                            <div>
                                                <input
                                                    ref={resumeInputRef}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                    className="hidden"
                                                    onChange={(e) => handleResumeChange(e)}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline w-full"
                                                    onClick={() => resumeInputRef.current?.click()}
                                                >
                                                    <i
                                                        data-lucide="upload"
                                                        className="h-4 w-4 mr-2"
                                                    ></i>
                                                    {uploading ? 'Uploading...' : 'Update Resume'}
                                                </button>
                                            </div>
                        </div>
                    </div>

                    {/*Social Links */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Social Profiles
                        </h3>
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
                                    data-lucide="github"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium">GitHub</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="globe"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Portfolio</span
                                >
                            </a>
                        </div>
                    </div>

                    {/*Quick Actions */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="user-dashboard.html"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="layout-dashboard"
                                    className="h-4 w-4 mr-2"
                                ></i>
                                View Dashboard
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="file-text"
                                    className="h-4 w-4 mr-2"
                                ></i>
                                My Applications
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="bookmark"
                                    className="h-4 w-4 mr-2"
                                ></i>
                                Saved Jobs
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

export default User_profile