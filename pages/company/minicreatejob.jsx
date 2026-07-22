import React, { useState } from "react";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostJob } from "./api/useCompany";

// -------------------------------
// Options
// -------------------------------

const jobTypeOptions = [
  "Full-time",
  "Part-time",
  "Internship",
];

// -------------------------------
// Validation
// -------------------------------

const schema = yup.object().shape({
  title: yup.string().required("Job title is required"),

  type: yup
    .string()
    .oneOf(jobTypeOptions)
    .required("Job type is required"),

  skills: yup
    .array()
    .of(yup.string())
    .min(1, "Add at least one skill"),

  vacancies: yup
    .number()
    .typeError("Enter vacancies")
    .positive()
    .required(),

  deadline: yup
    .date()
    .typeError("Deadline required")
    .required(),
});

export default function CreateJob() {

  // -------------------------------
  // API Hook
  // -------------------------------

  const { mutate, isLoading } = usePostJob();

  // -------------------------------
  // Local state ONLY for typing skill
  // -------------------------------

  const [skillInput, setSkillInput] = useState("");

  // -------------------------------
  // React Hook Form
  // -------------------------------

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({

    resolver: yupResolver(schema),

    defaultValues: {
      title: "",
      type: "",
      skills: [],
      vacancies: "",
      deadline: "",
    },
  });

  // -------------------------------
  // Watch skills
  // -------------------------------

  const skills =
    useWatch({
      control,
      name: "skills",
    }) || [];

  // -------------------------------
  // Add Skill
  // -------------------------------

  const handleAddSkill = () => {

    const nextSkill = skillInput.trim();

    if (!nextSkill) return;

    const currentSkills = getValues("skills") || [];

    const isDuplicate = currentSkills.some(
      (skill) =>
        skill.toLowerCase() === nextSkill.toLowerCase()
    );

    if (isDuplicate) {
      setSkillInput("");
      return;
    }

    setValue(
      "skills",
      [...currentSkills, nextSkill],
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );

    setSkillInput("");
  };

  // -------------------------------
  // Remove Skill
  // -------------------------------

  const handleRemoveSkill = (skillToRemove) => {

    const currentSkills =
      getValues("skills") || [];

    setValue(
      "skills",
      currentSkills.filter(
        (skill) => skill !== skillToRemove
      ),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  // -------------------------------
  // Submit
  // -------------------------------

  const onSubmit = (data) => {

    console.log("Form Data");

    console.log(data);

    mutate(
      {
        ...data,
        skills,
      },
      {
        onSuccess: () => {
          alert("Job Created!");

          reset();

          setSkillInput("");
        },
      }
    );
  };

  // -------------------------------
  // UI
  // -------------------------------

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>

      <h1>Create Job</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* --------------------- */}
        {/* Basic Info */}
        {/* --------------------- */}

        <h2>Basic Information</h2>

        <div>

          <label>Job Title</label>

          <br />

          <input
            {...register("title")}
            placeholder="Frontend Developer"
          />

          <p>{errors.title?.message}</p>

        </div>

        <br />

        <div>

          <label>Job Type</label>

          <br />

          <select {...register("type")}>

            <option value="">
              Select Job Type
            </option>

            {jobTypeOptions.map((job) => (

              <option
                key={job}
                value={job}
              >
                {job}
              </option>

            ))}

          </select>

          <p>{errors.type?.message}</p>

        </div>

        <hr />

        {/* --------------------- */}
        {/* Skills */}
        {/* --------------------- */}

        <h2>Required Skills</h2>

        <input
          value={skillInput}
          onChange={(e) =>
            setSkillInput(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              e.preventDefault();

              handleAddSkill();
            }
          }}
          placeholder="React"
        />

        <button
          type="button"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>

        <br />
        <br />

        {skills.map((skill) => (

          <span
            key={skill}
            style={{
              marginRight: 10,
            }}
          >
            {skill}

            <button
              type="button"
              onClick={() =>
                handleRemoveSkill(skill)
              }
            >
              X
            </button>

          </span>

        ))}

        <p>{errors.skills?.message}</p>

        <hr />

        {/* --------------------- */}
        {/* Application Settings */}
        {/* --------------------- */}

        <h2>Application Settings</h2>

        <div>

          <label>Vacancies</label>

          <br />

          <input
            type="number"
            {...register("vacancies", {
              valueAsNumber: true,
            })}
          />

          <p>{errors.vacancies?.message}</p>

        </div>

        <br />

        <div>

          <label>Deadline</label>

          <br />

          <input
            type="date"
            {...register("deadline")}
          />

          <p>{errors.deadline?.message}</p>

        </div>

        <br />

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Publishing..."
            : "Publish Job"}
        </button>

      </form>
    </div>
  );
}