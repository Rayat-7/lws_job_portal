import React, { useMemo, useState } from "react";
import { useJobs } from "./api/useCompany";

const Testmanagejob = () => {
  const { data, loading } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setpage] = useState(1);
  const jobs = data?.data || [];
  const perPage = 2;
  const start = (page - 1) * perPage;
  const filteredJobs = useMemo(() => {
    return jobs
      ?.filter((job) => {
        const matchTitle = job.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchStatus = status === "all" || job.status === status;

        return matchTitle && matchStatus;
      })
      .sort((a, b) => {
        if (sort === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }

        return new Date(a.createdAt) - new Date(b.createdAt);
      });
  }, [jobs, searchTerm, status, sort]);

  const pageJobs = filteredJobs.slice(start, start + perPage);

  return (
    <div>
      <h3 className="m-4 text-4xl">Jobs</h3>
      <div>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>

          <option value="Active">Active</option>

          <option value="Closed">Closed</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {pageJobs?.map((job) => {
        console.log(job);
        return (
          <div
            className="bg-gray-300 gap-4 ml-16 pb-4 border-b-2 border-white"
            key={job.id}
          >
            <h2>{job.title}</h2>
            <h2>{job.status}</h2>
          </div>
        );
      })}
      <div className="gap-4 ml-16 pb-4 border-b-2 border-white flex  ">
        <button onClick={() => setpage(page - 1)}>previous</button>
        <button onClick={() => setpage(page + 1)}>next</button>
      </div>
    </div>
  );
};

export default Testmanagejob;
