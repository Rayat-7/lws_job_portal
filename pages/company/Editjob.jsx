import React, { useEffect, useState } from 'react'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  X,
  Plus,
  Save,
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  FileText,
  Wrench,
  ClipboardList,
} from "lucide-react";

const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const workModeOptions = ['Remote', 'On-site', 'Hybrid'];
const categoryOptions = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance', 'Other'];
const experienceOptions = ['Entry', 'Mid', 'Senior', 'Expert', 'Lead'];
const salaryPeriodOptions = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const statusOptions = ['Active', 'Closed'];

// Mutation hook
export const useUpdateJob = () => {
  return useMutation({
    mutationFn: async (updatedJob) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/jobs/${updatedJob.id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
};

const sectionHeader = (icon, title) => (
  <div className="mb-4 flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))]">
      {icon}
    </div>
    <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--color-foreground))]">
      {title}
    </h3>
    <div className="h-px flex-1 bg-[hsl(var(--color-border))]" />
  </div>
);

const Editjob = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ ...job });
  const [skillInput, setSkillInput] = useState("");
  const updateJob = useUpdateJob('jobId');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    const nextSkill = skillInput.trim();
    if (!nextSkill) return;

    const currentSkills = formData.skills || [];
    const isDuplicate = currentSkills.some(
      (skill) => skill.toLowerCase() === nextSkill.toLowerCase()
    );
    if (isDuplicate) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...currentSkills, nextSkill],
    }));
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob.mutate(formData, {
      onSuccess: () => {
        alert("Job updated successfully!");
        onClose();
      },
      onError: () => {
        alert("Failed to update job.");
      },
    });
  };

  const skills = formData.skills || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[hsl(var(--color-border))] px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-[hsl(var(--color-foreground))]">
              Edit Job
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Update the details of your job posting
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[hsl(var(--color-muted-foreground))] transition-colors hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {/* Basic Information */}
            <section>
              {sectionHeader(<Briefcase className="h-4 w-4 text-white" />, "Basic Information")}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="label block mb-2">
                    Job Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Full Stack Developer"
                    className="input"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="type" className="label block mb-2">
                      Job Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="input"
                    >
                      {jobTypeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="workMode" className="label block mb-2">
                      Work Mode *
                    </label>
                    <select
                      id="workMode"
                      name="workMode"
                      value={formData.workMode}
                      onChange={handleChange}
                      className="input"
                    >
                      {workModeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location" className="label block mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" />
                      <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco"
                        className="input pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category" className="label block mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="experienceLevel" className="label block mb-2">
                      Experience Level *
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="input"
                    >
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option === 'Entry' ? 'Entry Level (0-2 years)' : option === 'Mid' ? 'Mid Level (2-5 years)' : option === 'Senior' ? 'Senior Level (5-10 years)' : option === 'Expert' ? 'Expert Level (10+ years)' : 'Lead (10+ years)'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="label block mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="input"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Compensation */}
            <section>
              {sectionHeader(<DollarSign className="h-4 w-4 text-white" />, "Compensation")}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="salaryMin" className="label block mb-2">
                    Minimum Salary ($)
                  </label>
                  <input
                    type="number"
                    id="salaryMin"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="e.g. 100000"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="salaryMax" className="label block mb-2">
                    Maximum Salary ($)
                  </label>
                  <input
                    type="number"
                    id="salaryMax"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="e.g. 150000"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="salaryPeriod" className="label block mb-2">
                    Salary Period
                  </label>
                  <select
                    id="salaryPeriod"
                    name="salaryPeriod"
                    value={formData.salaryPeriod}
                    onChange={handleChange}
                    className="input"
                  >
                    {salaryPeriodOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              {sectionHeader(<FileText className="h-4 w-4 text-white" />, "Job Description")}
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="label block mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="w-full rounded-md border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] px-3 py-2 text-sm placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))]"
                  />
                </div>
                <div>
                  <label htmlFor="requirements" className="label block mb-2">
                    Requirements & Qualifications
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="4"
                    placeholder="List the required skills, qualifications, and experience..."
                    className="w-full rounded-md border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] px-3 py-2 text-sm placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))]"
                  />
                </div>
                <div>
                  <label htmlFor="benefits" className="label block mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
                    className="w-full rounded-md border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] px-3 py-2 text-sm placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))]"
                  />
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              {sectionHeader(<Wrench className="h-4 w-4 text-white" />, "Required Skills")}
              <div className="space-y-4">
                <div>
                  <label htmlFor="skillInput" className="label block mb-2">
                    Add Skill
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="skillInput"
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      className="input flex-1"
                      placeholder="Type a skill and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label block mb-3">Added Skills</label>
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-secondary inline-flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            className="transition-colors hover:text-red-600"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      No skills added yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Application Settings */}
            <section>
              {sectionHeader(<ClipboardList className="h-4 w-4 text-white" />, "Application Settings")}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="vacancies" className="label block mb-2">
                    Number of Vacancies
                  </label>
                  <input
                    type="number"
                    id="vacancies"
                    name="vacancies"
                    value={formData.vacancies}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="deadline" className="label block mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline?.slice(0, 10) || ""}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/40 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateJob.isLoading}
              className="btn btn-primary"
            >
              {updateJob.isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editjob
