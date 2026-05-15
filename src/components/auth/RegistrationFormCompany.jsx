import React from "react";
import { useState } from "react";

const RegistrationFormCompany = () => {
    const role = "COMPANY";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [industry, setIndustry] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");
    const [foundedYear, setFoundedYear] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            alert("Passwords do not match! Please re-enter.");
            return
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, name, websiteUrl, industry, foundedYear, employeeCount, location, description, email, password })

        })
        const result =await response.json();
        if(result.success){
            alert("Registration Success")
            console.log("Registration successful", result.message)
        }
        else{
            alert("Registration Failed")
            console.error("Registration failed", result.message)
        }

        } catch (error){
                console.error('Registration Failed', error)
        }
    }


  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Company Information Section  */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <i data-lucide="building" className="h-5 w-5 text-primary"></i>
            <h2 className="text-lg font-semibold">Company Information</h2>
          </div>
          Company Name
          <div className="space-y-2">
              <label htmlFor="companyName" className="label">
              Company Name
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="building-2"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="input pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., TechCorp Solutions"
                required
              />
            </div>
          </div>
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
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="john.doe@company.com"
                required
              />
            </div>
          </div>
          Company Website & Industry Row
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="website" className="label">
                Company Website
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <i
                  data-lucide="globe"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                ></i>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="input pl-10"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="industry" className="label">
                Industry
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <i
                  data-lucide="briefcase"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                ></i>
                <select
                  id="industry"
                  name="industry"
                  className="input pl-10"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing & Advertising</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          Company Size & Founded Year Row
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="companySize" className="label">
                Company Size
              </label>
              <div className="relative">
                <i
                  data-lucide="users"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                ></i>
                <select
                  id="companySize"
                  name="companySize"
                  className="input pl-10"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="foundedYear" className="label">
                Founded Year
              </label>
              <div className="relative">
                <i
                  data-lucide="calendar"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                ></i>
                <input
                  type="number"
                  id="foundedYear"
                  name="foundedYear"
                  className="input pl-10"
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(e.target.value)}
                  placeholder="e.g., 2010"
                  min="1800"
                  max="2025"
                />
              </div>
            </div>
          </div>
          Company Location
          <div className="space-y-2">
            <label htmlFor="location" className="label">
              Headquarters Location
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i
                data-lucide="map-pin"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              ></i>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input pl-10"
                placeholder="City, Country"
                required
              />
            </div>
          </div>
          Company Description
          <div className="space-y-2">
            <label htmlFor="description" className="label">
              Company Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your company, mission, and what makes it a great place to work..."
              required
            ></textarea>
            <p className="text-xs text-muted-foreground">
              Minimum 100 characters. This will be displayed on your company
              profile.
            </p>
          </div>
        </div>
        Account Security Section
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <i data-lucide="shield" className="h-5 w-5 text-primary"></i>
            <h2 className="text-lg font-semibold">Account Security</h2>
          </div>
          Password Fields Row
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
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
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
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
        </div>
        Terms and Conditions
        <div className="space-y-3 pt-2">
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

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="verified"
              name="verified"
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
              required
            />
            <label htmlFor="verified" className="text-sm text-muted-foreground">
              I confirm that I am an authorized representative of this company
              and have the right to register on its behalf
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="updates"
              name="updates"
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
            />
            <label htmlFor="updates" className="text-sm text-muted-foreground">
              Send me product updates, hiring tips, and promotional offers via
              email
            </label>
          </div>
        </div>
        Submit Button
        <button
          type="submit"
          className="btn btn-primary w-full text-base h-11 mt-2"
        >
          <i data-lucide="building-2" className="h-4 w-4 mr-2"></i>
          Register Company
        </button>
      </form>
    </div>
  );
};

export default RegistrationFormCompany;
