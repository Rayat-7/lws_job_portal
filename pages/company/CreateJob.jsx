import React, { useState } from 'react'
import * as yup from 'yup';
import {useForm, useWatch} from 'react-hook-form';
import {usePostJob} from './api/useCompany';
import {yupResolver} from '@hookform/resolvers/yup';

const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const workModeOptions = ['Remote', 'On-site', 'Hybrid'];
const categoryOptions = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance', 'Other'];
const experienceOptions = ['Entry', 'Mid', 'Senior', 'Expert', 'Lead'];
const salaryPeriodOptions = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'];

const schema = yup.object().shape({
    title: yup.string().trim().required('Job title is required'),
    type: yup.string().oneOf(jobTypeOptions, 'Select a valid job type').required('Job type is required'),
    workMode: yup.string().oneOf(workModeOptions, 'Select a valid work mode').required('Work mode is required'),
    location: yup.string().trim().required('Location is required'),
    category: yup.string().oneOf(categoryOptions, 'Select a valid category').required('Category is required'),
    experienceLevel: yup.string().oneOf(experienceOptions, 'Select a valid experience level').required('Experience level is required'),
    salaryMin: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || Number.isNaN(value) ? undefined : value))
        .min(0, 'Minimum salary must be a positive number')
        .nullable(),
    salaryMax: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || Number.isNaN(value) ? undefined : value))
        .nullable()
        .when('salaryMin', (salaryMin, schema) => (salaryMin != null ? schema.min(salaryMin, 'Maximum salary must be greater than or equal to minimum salary') : schema)),
    salaryPeriod: yup.string().oneOf(salaryPeriodOptions, 'Select a valid salary period').required('Salary period is required'),
    description: yup.string().trim().required('Job description is required'),
    requirements: yup.string().trim().required('Requirements are required'),
    benefits: yup.string().trim().nullable(),
    skills: yup.array().of(yup.string().trim().min(1)).min(1, 'At least one skill is required').required('At least one skill is required'),
    vacancies: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || Number.isNaN(value) ? undefined : value))
        .integer('Number of vacancies must be a whole number')
        .positive('Number of vacancies must be greater than 0')
        .required('Number of vacancies is required'),
    deadline: yup.date().typeError('Deadline is required').required('Deadline is required'),
})


const CreateJob = () => {
    const {mutate,isLoading,isError,error} = usePostJob()
    const [skillInput, setSkillInput] = useState('')

    const{
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
        formState:{errors},
    }=useForm({
        resolver:yupResolver(schema),
        defaultValues:{
        title:"",
        type:"",
        workMode:"",
        location:"",
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

    const skills = useWatch({
        control,
        name: 'skills',
    }) || []

    const handleAddSkill = () => {
        const nextSkill = skillInput.trim();

        if (!nextSkill) {
            return;
        }

        const currentSkills = getValues('skills') || [];
        const isDuplicate = currentSkills.some((skill) => skill.toLowerCase() === nextSkill.toLowerCase());

        if (isDuplicate) {
            setSkillInput('');
            return;
        }

        setValue('skills', [...currentSkills, nextSkill], {
            shouldValidate: true,
            shouldDirty: true,
        });
        setSkillInput('');
    }

    const handleRemoveSkill = (skillToRemove) => {
        const currentSkills = getValues('skills') || [];
        setValue(
            'skills',
            currentSkills.filter((skill) => skill !== skillToRemove),
            { shouldValidate: true, shouldDirty: true }
        );
    }

    const onSubmit = (data) =>{
        mutate({
            ...data,
            skills,
        },{
            onSuccess:()=>{
                reset();
                setSkillInput('');
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
                            {...register("title")}
                                type="text"
                                id="jobTitle"
                                className="input"
                                placeholder="e.g. Senior Full Stack Developer"
                                
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="jobType" className="label block mb-2"
                                    >Job Type *</label
                                >
                                <select {...register("type")} id="jobType" className="select" required>
                                    <option value="">Select job type</option>
                                    {jobTypeOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="workMode" className="label block mb-2"
                                    >Work Mode *</label
                                >
                                <select {...register("workMode")} id="workMode" className="select" required>
                                    <option value="">Select work mode</option>
                                    {workModeOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.workMode && <p className="text-red-500">{errors.workMode.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="label block mb-2"
                                    >Category *</label
                                >
                                <select {...register("category")} id="category" className="select" required>
                                    <option value="">Select category</option>
                                    {categoryOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="experienceLevel" className="label block mb-2"
                                    >Experience Level *</label
                                >
                                <select {...register("experienceLevel")} id="experienceLevel" className="select" required>
                                    <option value="">
                                        Select experience level
                                    </option>
                                    {experienceOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option === 'Entry' ? 'Entry Level (0-2 years)' : option === 'Mid' ? 'Mid Level (2-5 years)' : option === 'Senior' ? 'Senior Level (5-10 years)' : option === 'Expert' ? 'Expert Level (10+ years)' : 'Lead (10+ years)'}
                                        </option>
                                    ))}
                                </select>
                                {errors.experienceLevel && <p className="text-red-500">{errors.experienceLevel.message}</p>}
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
                                <label htmlFor="location" className="label block mb-2"
                                    >Location *</label
                                >
                                <input
                                    type="text"
                                    {...register("location")}
                                    id="location"
                                    className="input"
                                    placeholder="e.g. San Francisco"
                                    required
                                />
                                {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="salaryMin" className="label block mb-2"
                                    >Minimum Salary ($)</label
                                >
                                <input
                                    type="number"
                                    {...register("salaryMin", { valueAsNumber: true })}
                                    className="input"
                                    placeholder="e.g. 100000"
                                />
                                {errors.salaryMin && <p className="text-red-500">{errors.salaryMin.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="salaryMax" className="label block mb-2"
                                    >Maximum Salary ($)</label
                                >
                                <input
                                    type="number"
                                    {...register("salaryMax", { valueAsNumber: true })}
                                    className="input"
                                    placeholder="e.g. 150000"
                                />
                                {errors.salaryMax && <p className="text-red-500">{errors.salaryMax.message}</p>}
                            </div>

                            <div>
                                <label
                                    htmlFor="salaryPeriod"
                                    className="label block mb-2"
                                    >Salary Period</label
                                >
                                <select {...register("salaryPeriod")} id="salaryPeriod" className="select">
                                    <option value="">Select salary period</option>
                                    {salaryPeriodOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.salaryPeriod && <p className="text-red-500">{errors.salaryPeriod.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/*Job Description */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">Job Description</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="description" className="label block mb-2"
                                >Job Description *</label
                            >
                            <textarea
                                {...register("description")}
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
                            <label htmlFor="requirements" className="label block mb-2"
                                >Requirements & Qualifications</label
                            >
                            <textarea
                                {...register("requirements")}
                                id="requirements"
                                className="textarea"
                                rows="6"
                                placeholder="List the required skills, qualifications, and experience..."
                            ></textarea>
                            {errors.requirements && <p className="text-red-500">{errors.requirements.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="benefits" className="label block mb-2"
                                >Benefits & Perks</label
                            >
                            <textarea
                                {...register("benefits")}
                                id="benefits"
                                className="textarea"
                                rows="5"
                                placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
                            ></textarea>
                            {errors.benefits && <p className="text-red-500">{errors.benefits.message}</p>}
                        </div>
                    </div>
                </div>

                {/*Skills & Requirements */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-6">Required Skills</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="skillInput" className="label block mb-2"
                                >Add Skills *</label
                            >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(event) => setSkillInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            handleAddSkill();
                                        }
                                    }}
                                    className="input flex-1"
                                    placeholder="Type a skill and press Add"
                                />
                                <button type="button" onClick={handleAddSkill} className="btn btn-primary">
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
                                {skills.length > 0 ? skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="badge badge-secondary inline-flex items-center gap-1"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            className="hover:text-red-600"
                                            onClick={() => handleRemoveSkill(skill)}
                                        >
                                            <i data-lucide="x" className="h-3 w-3"></i>
                                        </button>
                                    </span>
                                )) : (
                                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                        No skills added yet.
                                    </p>
                                )}
                            </div>
                        </div>
                        {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
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
                                    {...register("vacancies", { valueAsNumber: true })}
                                    id="vacancies"
                                    className="input"
                                    placeholder="e.g. 2"
                                    min="1"
                                />
                                {errors.vacancies && <p className="text-red-500">{errors.vacancies.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="deadline" className="label block mb-2"
                                    >Application Deadline *</label
                                >
                                <input
                                    type="date"
                                    {...register("deadline")}
                                    id="deadline"
                                    className="input"
                                    required
                                />
                                {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/*Form Actions */}
                <div className="card p-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1"></div>
                        {isError && error?.message && (
                            <p className="text-sm text-red-500 sm:mr-auto sm:self-center">
                                {error.message}
                            </p>
                        )}
                        <a
                            href="company-dashboard.html"
                            className="btn btn-outline"
                        >
                            Cancel
                        </a>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            <i data-lucide="send" className="h-4 w-4 mr-2"></i>
                            {isLoading ? 'Publishing...' : 'Publish Job'}
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