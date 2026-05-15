import React from 'react'

const UserNav = ({userName,email}) => {
const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
}

  return (
    <header
            className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div
                className="container mx-auto flex h-16 items-center justify-between px-4"
            >
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center space-x-2">
                        <i
                            data-lucide="briefcase"
                            className="h-8 w-8 text-[hsl(var(--color-primary))]"
                        ></i>
                        <span className="text-xl font-bold">LWS Job Portal</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="/"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >Jobs</a
                        >
                        <a
                            href="user-dashboard.html"
                            className="text-sm font-medium transition-colors text-[hsl(var(--color-primary))]"
                            >Dashboard</a
                        >
                        <a
                            href="applied-jobs.html"
                            className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                            >My Applications</a
                        >
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
                        >
                            <i
                                data-lucide="user"
                                className="h-4 w-4 text-[hsl(var(--color-primary))]"
                            ></i>
                        </div>
                        <span className="text-sm font-medium hidden md:inline"
                            >{userName}</span
                        >
                    </div>
                </div>
            </div>
        </header>

  )
}

export default UserNav