import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const role = "USER";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpass) {
          alert("Passwords do not match!");
          return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ role, name, email, phone, experience, password, title }),
            })
            const result = await response.json();
            if (result.success) {
                alert("Registration Success")
                navigate('/login')
            } else {
                alert("Registration Failed")
                console.error("Registration failed", result.message)
            }

        } catch (error) {
            console.error('Registration Failed', error)
        }
    }
  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name Fields Row */}
        <div className="space-y-2">
          <label htmlFor="name" className="label">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <i
              data-lucide="user"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            ></i>
            <input
              type="text"
              id="name"
              name="name"
              className="input pl-10"
              placeholder="John"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="email" className="label">
              Email Address
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="mail"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="input pl-10"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="label">
              Phone Number
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="phone"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input pl-10"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          </div>
        </div>
        {/* Job Title & Experience Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="experience" className="label">
              Years of Experience
            </label>
            <div className="relative">
              <i
                data-lucide="calendar"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <select id="experience" name="experience" className="input pl-10" value={experience} onChange={(e)=>setExperience(e.target.value)}>
                <option value="">Select experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior (6-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="title" className="label">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input "
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter your job title"
            />
          </div>
        </div>
        {/* Password Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="password" className="label">
              Password
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="lock"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="password"
                id="password"
                name="password"
                className="input pl-10 pr-10"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <i data-lucide="eye" className="h-4 w-4"></i>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="lock"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmpass}
                onChange={(e)=>setConfirmPass(e.target.value)}
                className="input pl-10 pr-10"
                placeholder="Re-enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <i data-lucide="eye" className="h-4 w-4"></i>
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          Password must be at least 8 characters with letters and numbers
        </p>
        {/* Terms and Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
            required
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
            and
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {/* Newsletter Subscription Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-base h-11 mt-2"
        >
          <i data-lucide="user-plus" className="h-4 w-4 mr-2"></i>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm