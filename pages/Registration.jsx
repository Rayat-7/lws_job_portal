import React from 'react'
import RegistrationForm from '../src/components/auth/RegistrationForm'
import { useState } from 'react'
import RegistrationFormCompany from '../src/components/auth/RegistrationFormCompany'
const Registration = () => {
const[formstate,setFormstate]=useState("jobseeker")
  function handlejobseekerButton () {
    
    setFormstate("jobseeker")
  }
  function handleEmployeeButton(){
    setFormstate("employee")
  }
  return (
    <div className="bg-background text-foreground antialiased">
        Header/Navigation 
        <header
            className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div
                className="container mx-auto flex h-16 items-center justify-between px-4"
            >
                <div className="flex items-center gap-8">
                    <a href="index.html" className="flex items-center space-x-2">
                        <i
                            data-lucide="briefcase"
                            className="h-8 w-8 text-primary"
                        ></i>
                        <span className="text-xl font-bold">LWS Job Portal</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground"
                        >Already have an account?</span
                    >
                    <a href="login.html" className="btn btn-ghost text-sm"
                        >Sign In</a
                    >
                </div>
            </div>
        </header>

        Main Content 
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                Page Title 
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
                    >
                        <i
                            data-lucide="user-plus"
                            className="h-8 w-8 text-primary"
                        ></i>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3">
                        Create Your Account
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Join thousands of professionals finding their dream jobs
                    </p>
                </div>

                Account Type Toggle 
                <div className="w-full text-center">
                    <div
                        className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md"
                    >
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <button onClick={handlejobseekerButton}  
                            className= {formstate==="jobseeker"?  " btn btn-primary text-center" : "btn btn-ghost text-center"}>
                                <i data-lucide="user" className="h-4 w-4 mr-2"></i>
                                Job Seeker
                            </button>
                           

                            <button 
                            onClick={handleEmployeeButton} 
                            className={formstate==="jobseeker"  ? "btn btn-ghost text-center" : "btn btn-primary text-center"}>
                                <i data-lucide="building-2" className="h-4 w-4 mr-2"></i>
                                Employer
                            </button>
                            
                        </div>
                    </div>
                </div>

                Registration Card 
                <div className="card p-8 md:p-10">
                    Registration Form 
                    {formstate ==="jobseeker" ?<RegistrationForm /> :<RegistrationFormCompany/> }
                    

                    Divider 
                    <div className="relative my-8">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span
                                className="px-4 bg-card text-muted-foreground font-medium"
                                >Or continue with</span
                            >
                        </div>
                    </div>

                    Sign In Link 
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?
                        <a
                            href="login.html"
                            className="text-primary hover:underline font-medium"
                            >Sign in</a
                        >
                    </div>
                </div>

                Feature Highlights 
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                            <i
                                data-lucide="briefcase"
                                className="h-5 w-5 text-primary"
                            ></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-1">
                                Thousands of Jobs
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Access opportunities from top companies
                                worldwide
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                            <i
                                data-lucide="bell"
                                className="h-5 w-5 text-primary"
                            ></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-1">
                                Job Alerts
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Get notified when new jobs match your profile
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                            <i
                                data-lucide="shield-check"
                                className="h-5 w-5 text-primary"
                            ></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-1">
                                Secure & Private
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Your data is protected with industry-standard
                                security
                            </p>
                        </div>
                    </div>
                </div>

                Additional Information 
                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        By creating an account, you'll get access to thousands
                        of job opportunities from top companies worldwide.
                    </p>
                </div>
            </div>
        </main>

        Footer 
        <footer className="border-t border-border bg-muted/30 mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">LWS Job Portal</h3>
                        <p className="text-sm text-muted-foreground">
                            Your trusted platform for finding the perfect job or
                            the perfect candidate.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Job Seekers</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Browse Jobs</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Companies</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Career Advice</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Salary Guide</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Employers</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Post a Job</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Browse Candidates</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Pricing</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Employer Resources</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >About Us</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Contact</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Privacy Policy</a
                                >
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground"
                                    >Terms of Service</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground"
                >
                    <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Registration