import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const uploadResume = async (file, token) => {
    const formData = new FormData();
    formData.append("resume", file);

    const authToken = token || localStorage.getItem("token");

    const response = await axios.post(`${API_BASE}/api/users/resume`, formData, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response.data;
};


export const ApplyForJob = async (jobId, coverletter) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE}/api/applications/jobs/${jobId}/apply`, {
        coverLetter: coverletter,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}