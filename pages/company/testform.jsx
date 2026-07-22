import React, { useState } from "react";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostJob } from "./api/useCompany";

const jobTypeOptions = [
  "Full-time",
  "Part-time",
  "Internship",
];

const schema = yup.object().shape({
    title: yup.string().required("Job title is required"),
    type: yup.string().oneOf(jobTypeOptions).required("Job type is required"),
    skills: yup.array().of(yup.string()).min(1, "Add at least one skill"),
    vacancies: yup.number().typeError("Enter vacancies").positive().required(),
    deadline: yup.date().typeError("Deadline required").required(),
});

export default function CreateJob() {

    const { mutate,isLoading } = usePostJob();
    const[skillInput,setSkillInput]=useState("");

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
    const skills = useWatch({
        control,
        name: "skills",
    })|| [];
    
    
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


  onsubmit = (data) => {
    console.log("Form Data:", data);
    mutate(data,{
        ...data,
        skills,
    },
{
    onSuccess:()=>{
        alert("Job posted successfully");
        reset();
        skillInput("");
    }
})}
    return(
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>

            <h1>Create Job</h1>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h2>Basic Information</h2>
                <input
                {...register("title")}
                placeholder="Job Title"
                />
                {errors.title && <p>{errors.title.message}</p>}

                 <label>Job Type</label>
                 <select {...register('type')}>
                     <option value="">
              Select Job Type
            </option>

            {jobTypeOptions.map((job)=>(
                <option
                key={job}
                value={job}
              >
                {job}
              </option>
            ))}
                 </select>
                   <p>{errors.type?.message}</p>


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
                </form>

        </div>
    )

    }