import React from 'react'
import { useCompanyProfile } from './api/useCompany'


const CompanyHeader = () => {

const {data:companydata,isLoading,error}=useCompanyProfile();


  return (
        <div className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                            className="text-sm font-medium text-[hsl(var(--color-primary))]"
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
                    <a href="#" className="btn btn-primary">
                        <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
                        Post Job
                    </a>

                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <img src={companydata?.data.logoUrl} alt="Company Logo" className="h-6 w-6 rounded-full" />
                        </div>
                        <span className="text-sm font-medium hidden md:inline"
                            >{companydata?.data.name}</span
                        >
                    </div>
                </div>
            </div>
        </div>
        
  )
}

export default CompanyHeader