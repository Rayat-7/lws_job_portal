import React from 'react'
import * as yup from 'yup';
import {useForm,Controller} from 'react-hook-form';
import {usePostJob} from './api/useCompany';
import {yupResolver} from '@hookform/resolvers/yup';

 const schema =yup.object().shape({
        title:yup.string().required("Job title is required"),
        type:yup.string().required("Job type is required"),
        workMode:yup.string().required("Work mode is required"),
        workMode:yup.string().required("Work mode is required"),
        category:yup.string().required("Category is required"),
        experienceLevel:yup.string().required("Experience level is required"),
        salaryMin:yup.number().min(0,"Minimum salary must be a positive number"),
        salaryMax:yup.number().min(yup.ref('salaryMin'),"Maximum salary must be greater than or equal to minimum salary"),
        salaryPeriod:yup.string().required("Salary period is required"),
        description:yup.string().required("Job description is required"),
        requirements:yup.string().required("Requirements are required"),
        benefits:yup.string(),
        skills:yup.array().of(yup.string()).min(1,"At least one skill is required"),
        vacancies:yup.number().positive().required("Number of vacancies is required"),
        deadline:yup.date().required("Deadline is required"),
    })


const CreateJob = () => {
    const {mutate,isLoading,isError,error} = usePostJob()

    const{
        register,
        handleSubmit,
        control,
        reset,
        formState:{errors},
    }=useForm({
        resolver:yupResolver(schema),
        defaultValues:{
        title:"",
        type:"",
        workMode:"",
        category:"",
        experienceLevel:"",
        salaryMin:"",
        salaryMax:"",
        salaryPeriod:"",
        description:"",
        requirements:"",
        benefits:"",
        skills:[],
        vacancies:"",
        deadline:"",
        }
    });

    const onSubmit = (data) =>{
        mutate(data,{
            onSuccess:()=>{
                reset();
                alert("Job posted successfully");
            },
        })
    }


   
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
                            href="company-dashboard.html"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Dashboard</a
                        >
                        <a
                            href="#"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Manage Jobs</a
                        >
                        <a
                            href="#"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Applicants</a
                        >
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <i
                                data-lucide="building-2"
                                className="h-4 w-4 text-[hsl(var(--color-primary))]"
                            ></i>
                        </div>
                        <span className="text-sm font-medium hidden md:inline"
                            >TechCorp Solutions</span
                        >
                    </div>
                </div>
            </div>
        </header>

        {/*Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            {/*Page Header */}
            <div className="mb-8">
                <div
                    className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2"
                >
                    <a
                        href="company-dashboard.html"
                        className="hover:text-[hsl(var(--color-primary))]"
                        >Dashboard</a
                    >
                    <i data-lucide="chevron-right" className="h-4 w-4"></i>
                    <span className="text-[hsl(var(--color-foreground))]"
                        >Create Job</span
                    >
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
                        <p className="text-[hsl(var(--color-muted-foreground))]">
                            Fill in the details to create a new job posting
                        </p>
                    </div>
                    <a href="company-dashboard.html" className="btn btn-outline">
                        <i data-lucide="x" className="h-4 w-4 mr-2"></i>
                        Cancel
                    </a>
                </div>
            </div>

            {/*Create Job Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/*Basic Information */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Basic Information
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label for="jobTitle" className="label block mb-2"
                                >Job Title *</label
                            >
                            <input
                                type="text"
                                id="jobTitle"
                                className="input"
                                placeholder="e.g. Senior Full Stack Developer"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="jobType" className="label block mb-2"
                                    >Job Type *</label
                                >
                                <select id="jobType" className="select" required>
                                    <option value="">Select job type</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="internship">
                                        Internship
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label for="workMode" className="label block mb-2"
                                    >Work Mode *</label
                                >
                                <select id="workMode" className="select" required>
                                    <option value="">Select work mode</option>
                                    <option value="on-site">On-site</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="category" className="label block mb-2"
                                    >Category *</label
                                >
                                <select id="category" className="select" required>
                                    <option value="">Select category</option>
                                    <option value="engineering">
                                        Engineering
                                    </option>
                                    <option value="design">Design</option>
                                    <option value="product">Product</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="sales">Sales</option>
                                    <option value="hr">Human Resources</option>
                                    <option value="finance">Finance</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label for="experience" className="label block mb-2"
                                    >Experience Level *</label
                                >
                                <select id="experience" className="select" required>
                                    <option value="">
                                        Select experience level
                                    </option>
                                    <option value="entry">
                                        Entry Level (0-2 years)
                                    </option>
                                    <option value="mid">
                                        Mid Level (2-5 years)
                                    </option>
                                    <option value="senior">
                                        Senior Level (5-10 years)
                                    </option>
                                    <option value="lead">
                                        Lead (10+ years)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Location & Salary */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Location & Compensation
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label for="city" className="label block mb-2"
                                    >Location *</label
                                >
                                <input
                                    type="text"
                                    id="city"
                                    className="input"
                                    placeholder="e.g. San Francisco"
                                    required
                                />
                            </div>

                            <div>
                                <label for="salaryMin" className="label block mb-2"
                                    >Minimum Salary ($)</label
                                >
                                <input
                                    type="number"
                                    id="salaryMin"
                                    className="input"
                                    placeholder="e.g. 100000"
                                />
                            </div>

                            <div>
                                <label for="salaryMax" className="label block mb-2"
                                    >Maximum Salary ($)</label
                                >
                                <input
                                    type="number"
                                    id="salaryMax"
                                    className="input"
                                    placeholder="e.g. 150000"
                                />
                            </div>

                            <div>
                                <label
                                    for="salaryPeriod"
                                    className="label block mb-2"
                                    >Salary Period</label
                                >
                                <select id="salaryPeriod" className="select">
                                    <option value="yearly">Yearly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="hourly">Hourly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Job Description */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">Job Description</h2>
                    <div className="space-y-6">
                        <div>
                            <label for="description" className="label block mb-2"
                                >Job Description *</label
                            >
                            <textarea
                                id="description"
                                className="textarea"
                                rows="8"
                                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                                required
                            ></textarea>
                            <p
                                className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2"
                            >
                                Provide a detailed description of the role and
                                responsibilities
                            </p>
                        </div>

                        <div>
                            <label for="requirements" className="label block mb-2"
                                >Requirements & Qualifications</label
                            >
                            <textarea
                                id="requirements"
                                className="textarea"
                                rows="6"
                                placeholder="List the required skills, qualifications, and experience..."
                            ></textarea>
                        </div>

                        <div>
                            <label for="benefits" className="label block mb-2"
                                >Benefits & Perks</label
                            >
                            <textarea
                                id="benefits"
                                className="textarea"
                                rows="5"
                                placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/*Skills & Requirements */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">Required Skills</h2>
                    <div className="space-y-4">
                        <div>
                            <label for="skillInput" className="label block mb-2"
                                >Add Skills *</label
                            >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="skillInput"
                                    className="input flex-1"
                                    placeholder="Type a skill and press Add"
                                />
                                <button type="button" className="btn btn-primary">
                                    <i
                                        data-lucide="plus"
                                        className="h-4 w-4 mr-2"
                                    ></i>
                                    Add
                                </button>
                            </div>
                            <p
                                className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2"
                            >
                                Add technical and soft skills required for this
                                position
                            </p>
                        </div>

                        <div>
                            <label className="label block mb-3">Added Skills</label>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    JavaScript
                                    <button
                                        type="button"
                                        className="hover:text-red-600"
                                    >
                                        <i data-lucide="x" className="h-3 w-3"></i>
                                    </button>
                                </span>
                                <span
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    React
                                    <button
                                        type="button"
                                        className="hover:text-red-600"
                                    >
                                        <i data-lucide="x" className="h-3 w-3"></i>
                                    </button>
                                </span>
                                <span
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    Node.js
                                    <button
                                        type="button"
                                        className="hover:text-red-600"
                                    >
                                        <i data-lucide="x" className="h-3 w-3"></i>
                                    </button>
                                </span>
                                <span
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    MongoDB
                                    <button
                                        type="button"
                                        className="hover:text-red-600"
                                    >
                                        <i data-lucide="x" className="h-3 w-3"></i>
                                    </button>
                                </span>
                                <span
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    AWS
                                    <button
                                        type="button"
                                        className="hover:text-red-600"
                                    >
                                        <i data-lucide="x" className="h-3 w-3"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Application Details */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Application Settings
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="vacancies" className="label block mb-2"
                                    >Number of Vacancies</label
                                >
                                <input
                                    type="number"
                                    id="vacancies"
                                    className="input"
                                    placeholder="e.g. 2"
                                    value="1"
                                    min="1"
                                />
                            </div>

                            <div>
                                <label for="deadline" className="label block mb-2"
                                    >Application Deadline *</label
                                >
                                <input
                                    type="date"
                                    id="deadline"
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/*Form Actions */}
                <div className="card p-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1"></div>
                        <a
                            href="company-dashboard.html"
                            className="btn btn-outline"
                        >
                            Cancel
                        </a>
                        <button type="submit" className="btn btn-primary">
                            <i data-lucide="send" className="h-4 w-4 mr-2"></i>
                            Publish Job
                        </button>
                    </div>
                </div>
            </form>
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

export default CreateJob