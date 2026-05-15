import React, { useEffect } from 'react'
import HomePage from './Homepage'
import UserNav from '../src/components/common/UserNav';
import { useState } from 'react';
import RecomenedJobCard from '../src/components/common/RecomenedJobCard';
const UserDashboard = () => {
const [userData,setUserData]=useState(null);
const [recomendedJobs,setRecomendedJobs]=useState([]);

const handleRecommendation = async () =>{
  try{
    const token =localStorage.getItem('token');
    const result = await fetch("http://localhost:5000/api/jobs/recommendations",{
      headers:{
        'Authorization':`Bearer ${token}`,
    }
    })
    if(result.ok){
      const recommendedjobs= await result.json();
      setRecomendedJobs(recommendedjobs);
      console.log(recommendedjobs);
    }
  }catch(error){
    console.error("error fetching data")
  }
}
  const fetchUserData =async ()=>{
      try{
        const token=localStorage.getItem('token');
        const response =await fetch('http://localhost:5000/api/users/profile',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        if(response.ok){
          const data =await response.json();
          setUserData(data);
          console.log('User Data:',data);
        }
      }catch(error){
        console.error("error fethcing data",error);
      }
  }

  useEffect(() => {
    fetchUserData();
    handleRecommendation();
  }, []);
  return (
    <> 
    <UserNav userName={userData?.data?.name || 'User'} email={userData?.data?.email || 'user Email'}/>
    <main className="container mx-auto px-4 py-8">
            {/*Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                <p className="text-[hsl(var(--color-muted-foreground))]">
                    Here's what's happening with your job search today.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/*Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/*Recent Applications */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                Recent Applications
                            </h2>
                            <a
                                href="#"
                                className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                                >View All</a
                            >
                        </div>
                        <div className="space-y-4">
                            {/*Application 1 */}
                            <div
                                className="border border-[hsl(var(--color-border))] rounded-lg p-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                        >
                                            <i
                                                data-lucide="building-2"
                                                className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex items-start justify-between gap-2 mb-2"
                                        >
                                            <div>
                                                <h3 className="font-semibold mb-1">
                                                    <a
                                                        href="job-details.html"
                                                        className="hover:underline"
                                                        >Senior Full Stack
                                                        Developer</a
                                                    >
                                                </h3>
                                                <p
                                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                                >
                                                    TechCorp Solutions
                                                </p>
                                            </div>
                                            <span className="badge badge-success"
                                                >Under Review</span
                                            >
                                        </div>
                                        <div
                                            className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))] mb-3"
                                        >
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                ></i>
                                                San Francisco, CA
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="calendar"
                                                    className="h-3 w-3"
                                                ></i>
                                                Applied on Nov 28, 2025
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="dollar-sign"
                                                    className="h-3 w-3"
                                                ></i>
                                                $120k - $180k
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href="job-details.html"
                                                className="btn btn-outline text-xs h-8"
                                                >View Job</a
                                            >
                                            <button
                                                className="btn btn-ghost text-xs h-8"
                                            >
                                                Withdraw Application
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Application 2 */}
                            <div
                                className="border border-[hsl(var(--color-border))] rounded-lg p-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                        >
                                            <i
                                                data-lucide="code"
                                                className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex items-start justify-between gap-2 mb-2"
                                        >
                                            <div>
                                                <h3 className="font-semibold mb-1">
                                                    <a
                                                        href="job-details.html"
                                                        className="hover:underline"
                                                        >Frontend Developer
                                                        (React)</a
                                                    >
                                                </h3>
                                                <p
                                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                                >
                                                    Innovate Labs
                                                </p>
                                            </div>
                                            <span className="badge badge-info"
                                                >Interview Scheduled</span
                                            >
                                        </div>
                                        <div
                                            className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))] mb-3"
                                        >
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                ></i>
                                                Seattle, WA
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="calendar"
                                                    className="h-3 w-3"
                                                ></i>
                                                Applied on Nov 25, 2025
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="dollar-sign"
                                                    className="h-3 w-3"
                                                ></i>
                                                $95k - $140k
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href="job-details.html"
                                                className="btn btn-outline text-xs h-8"
                                                >View Job</a
                                            >
                                            <button
                                                className="btn btn-ghost text-xs h-8"
                                            >
                                                Reschedule
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Application 3 */}
                            <div
                                className="border border-[hsl(var(--color-border))] rounded-lg p-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                                        >
                                            <i
                                                data-lucide="monitor"
                                                className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex items-start justify-between gap-2 mb-2"
                                        >
                                            <div>
                                                <h3 className="font-semibold mb-1">
                                                    <a
                                                        href="job-details.html"
                                                        className="hover:underline"
                                                        >UI/UX Designer</a
                                                    >
                                                </h3>
                                                <p
                                                    className="text-sm text-[hsl(var(--color-muted-foreground))]"
                                                >
                                                    Design Studio Pro
                                                </p>
                                            </div>
                                            <span className="badge badge-warning"
                                                >Pending</span
                                            >
                                        </div>
                                        <div
                                            className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))] mb-3"
                                        >
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                ></i>
                                                New York, NY
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="calendar"
                                                    className="h-3 w-3"
                                                ></i>
                                                Applied on Nov 20, 2025
                                            </span>
                                            <span>•</span>
                                            <span
                                                className="flex items-center gap-1"
                                            >
                                                <i
                                                    data-lucide="dollar-sign"
                                                    className="h-3 w-3"
                                                ></i>
                                                $90k - $130k
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href="job-details.html"
                                                className="btn btn-outline text-xs h-8"
                                                >View Job</a
                                            >
                                            <button
                                                className="btn btn-ghost text-xs h-8"
                                            >
                                                Withdraw Application
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Recommended Jobs */}
                    <RecomenedJobCard jobs={recomendedJobs?.data || []}/>
                </div>

                {/*Sidebar Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/*Quick Actions */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="user-profile.html"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="user"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >View Profile</span
                                >
                            </a>
                            <a
                                href="edit-user-profile.html"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="edit"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Edit Profile</span
                                >
                            </a>
                            <a
                                href="applied-jobs.html"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="file-text"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >My Applications</span
                                >
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="bookmark"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Saved Jobs</span
                                >
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
                            >
                                <i
                                    data-lucide="settings"
                                    className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
                                ></i>
                                <span className="text-sm font-medium"
                                    >Settings</span
                                >
                            </a>
                        </div>
                    </div>

                    {/*Tips */}
                    <div className="card p-6 bg-blue-50 border-blue-200">
                        <div className="flex items-start gap-3 mb-3">
                            <i
                                data-lucide="lightbulb"
                                className="h-5 w-5 text-blue-600 flex-shrink-0"
                            ></i>
                            <div>
                                <h3
                                    className="text-sm font-semibold text-blue-900 mb-1"
                                >
                                    Pro Tip
                                </h3>
                                <p className="text-xs text-blue-700">
                                    Applications submitted within 24 hours of
                                    posting have a 3x higher response rate.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </>
   
  )
}

export default UserDashboard