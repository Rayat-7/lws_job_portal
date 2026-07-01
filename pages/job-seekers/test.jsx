import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Briefcase, User, ChevronRight, X, Camera, Upload, Trash2, 
  Plus, FileText, Linkedin, Git, Globe, Save, Loader2 
} from 'lucide-react';

// ============================================
// API FUNCTIONS
// ============================================

// Fetch user profile
const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch('http://localhost:5000/api/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
};

// Update user profile
const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch('http://localhost:5000/api/users/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  
  return response.json();
};

// ============================================
// MAIN COMPONENT
// ============================================

const EditProfile = () => {
  const queryClient = useQueryClient();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  });
  
  // State for skills
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  // State for experience
  const [experiences, setExperiences] = useState([]);
  
  // State for education
  const [educations, setEducations] = useState([]);
  
  // State for resume
  const [resumeFile, setResumeFile] = useState(null);
  const [currentResume, setCurrentResume] = useState(null);

  // ============================================
  // FETCH USER DATA WITH REACT QUERY
  // ============================================
  
  const { 
    data: userResponse, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
  });

  // Populate form when data loads
  useEffect(() => {
    if (userResponse?.data) {
      const user = userResponse.data;
      
      // Set form data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        title: user.title || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        zipCode: user.zipCode || '',
        bio: user.bio || '',
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
        portfolioUrl: user.portfolioUrl || '',
      });
      
      // Set skills
      setSkills(user.skills || []);
      
      // Set experiences
      setExperiences(user.experience || []);
      
      // Set education
      setEducations(user.education || []);
      
      // Set resume info
      if (user.resumeOriginalName) {
        setCurrentResume({
          name: user.resumeOriginalName,
          size: user.resumeSize,
          uploadDate: user.resumeUploadDate,
          url: user.resumeUrl,
        });
      }
    }
  }, [userResponse]);

  // ============================================
  // UPDATE MUTATION
  // ============================================
  
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    
    onSuccess: (response) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      
      // Show success message
      alert('Profile updated successfully!');
      
      // You could also navigate back to profile page
      // navigate('/profile');
    },
    
    onError: (error) => {
      alert(`Update failed: ${error.message}`);
    },
  });

  // ============================================
  // HANDLERS
  // ============================================
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle skill operations
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // Handle experience operations
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      companyName: '',
      employmentType: 'Full-time',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      isNew: true,
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };

  // Handle education operations
  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      schoolName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isNew: true,
    };
    setEducations([...educations, newEdu]);
  };

  const removeEducation = (index) => {
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index] = { ...newEducations[index], [field]: value };
    setEducations(newEducations);
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setCurrentResume({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString(),
        isNew: true,
      });
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setCurrentResume(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for update
    const updateData = {
      ...formData,
      skills: skills,
      experience: experiences.map(exp => {
        // Remove temporary fields before sending
        const { isNew, ...rest } = exp;
        return rest;
      }),
      education: educations.map(edu => {
        // Remove temporary fields before sending
        const { isNew, ...rest } = edu;
        return rest;
      }),
    };
    
    // If there's a new resume file, handle it separately
    // For now, we'll send the data without file upload
    // You'll need to handle file upload separately with FormData
    
    updateMutation.mutate(updateData);
  };

  // ============================================
  // LOADING AND ERROR STATES
  // ============================================
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[hsl(var(--color-primary))]" />
          <p className="text-[hsl(var(--color-muted-foreground))]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading profile</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="bg-background text-foreground antialiased">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <a href="../index.html" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-[hsl(var(--color-primary))]" />
              <span className="text-xl font-bold">LWS Job Portal</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="../index.html" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">
                Jobs
              </a>
              <a href="user-dashboard.html" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">
                My Applications
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <User className="h-4 w-4 text-[hsl(var(--color-primary))]" />
              </div>
              <span className="text-sm font-medium hidden md:inline">
                {formData.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
            <a href="user-dashboard.html" className="hover:text-[hsl(var(--color-primary))]">Dashboard</a>
            <ChevronRight className="h-4 w-4" />
            <a href="user-profile.html" className="hover:text-[hsl(var(--color-primary))]">My Profile</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[hsl(var(--color-foreground))]">Edit Profile</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">
                Update your personal information and preferences
              </p>
            </div>
            <a href="user-profile.html" className="btn btn-outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </a>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Photo</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                  <User className="h-16 w-16 text-[hsl(var(--color-primary))]" />
                </div>
                <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white cursor-pointer hover:bg-[hsl(var(--color-primary))]/90 transition-colors">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Upload Profile Picture</h3>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                  JPG, PNG or GIF. Max size of 5MB.
                </p>
                <div className="flex gap-2">
                  <label className="btn btn-primary cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                  <button type="button" className="btn btn-outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="label block mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="label block mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  className="input"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="label block mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  className="input"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="label block mb-2">Professional Title</label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="e.g. Full Stack Developer"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="label block mb-2">City *</label>
                <input
                  type="text"
                  id="city"
                  className="input"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="label block mb-2">State/Province *</label>
                <input
                  type="text"
                  id="state"
                  className="input"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="label block mb-2">Country *</label>
                <input
                  type="text"
                  id="country"
                  className="input"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="label block mb-2">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  className="input"
                  placeholder="Enter zip code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">About</h2>
            <div>
              <label htmlFor="bio" className="label block mb-2">Professional Summary</label>
              <textarea
                id="bio"
                className="textarea"
                rows="5"
                placeholder="Write a brief summary about yourself..."
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Skills</h2>
            <div className="mb-4">
              <label htmlFor="skillInput" className="label block mb-2">Add Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="skillInput"
                  className="input flex-1"
                  placeholder="Type a skill and press Enter"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                />
                <button type="button" className="btn btn-primary" onClick={addSkill}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </button>
              </div>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                Add skills relevant to your profession. Press Enter or click Add to add each skill.
              </p>
            </div>
            <div>
              <label className="label block mb-3">Current Skills</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="badge badge-secondary inline-flex items-center gap-1">
                    {skill}
                    <button type="button" className="hover:text-red-600" onClick={() => removeSkill(skill)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <button type="button" className="btn btn-outline" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-[hsl(var(--color-border))] rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium">{exp.title || 'New Experience'}</h3>
                    <button
                      type="button"
                      className="btn-ghost p-1 text-red-600 hover:bg-red-50"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label block mb-2">Company</label>
                      <input
                        type="text"
                        className="input"
                        value={exp.companyName || ''}
                        onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label block mb-2">Employment Type</label>
                      <select 
                        className="input"
                        value={exp.employmentType || 'Full-time'}
                        onChange={(e) => handleExperienceChange(index, 'employmentType', e.target.value)}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                    <div>
                      <label className="label block mb-2">Location</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="City, Country"
                        value={exp.location || ''}
                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label block mb-2">Start Date</label>
                      <input
                        type="date"
                        className="input"
                        value={exp.startDate ? exp.startDate.split('T')[0] : ''}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label block mb-2">End Date</label>
                      <input
                        type="date"
                        className="input"
                        value={exp.endDate ? exp.endDate.split('T')[0] : ''}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label block mb-2">Description</label>
                      <textarea
                        className="textarea"
                        rows="2"
                        placeholder="Describe your responsibilities and achievements"
                        value={exp.description || ''}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Education</h2>
              <button type="button" className="btn btn-outline" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </button>
            </div>

            {educations.map((edu, index) => (
              <div key={edu.id} className="p-4 border border-[hsl(var(--color-border))] rounded-lg mb-4">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium">{edu.fieldOfStudy || 'New Education'}</h3>
                  <button
                    type="button"
                    className="btn-ghost p-1 text-red-600 hover:bg-red-50"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label block mb-2">Institution</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="School/University name"
                      value={edu.schoolName || ''}
                      onChange={(e) => handleEducationChange(index, 'schoolName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Degree</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Bachelor of Science"
                      value={edu.degree || ''}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Field of Study</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Computer Science"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Start Date</label>
                    <input
                      type="date"
                      className="input"
                      value={edu.startDate ? edu.startDate.split('T')[0] : ''}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">End Date</label>
                    <input
                      type="date"
                      className="input"
                      value={edu.endDate ? edu.endDate.split('T')[0] : ''}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resume Upload */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Resume/CV</h2>
            <div className="space-y-4">
              {currentResume && (
                <div className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{currentResume.name}</p>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                        {currentResume.uploadDate ? `Updated ${new Date(currentResume.uploadDate).toLocaleDateString()}` : 'New'} • {currentResume.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost p-2 text-red-600 hover:bg-red-50"
                      onClick={removeResume}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="btn btn-outline w-full cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {currentResume ? 'Replace Resume' : 'Upload Resume'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                  />
                </label>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                  Supported formats: PDF, DOC, DOCX. Max size: 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Social Profiles</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="linkedinUrl" className="label block mb-2">
                  <Linkedin className="h-4 w-4 inline mr-1" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  className="input"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="githubUrl" className="label block mb-2">
                  <Github className="h-4 w-4 inline mr-1" />
                  GitHub
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  className="input"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="portfolioUrl" className="label block mb-2">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Portfolio Website
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  className="input"
                  placeholder="https://yourwebsite.com"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="card p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <a href="user-profile.html" className="btn btn-outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </a>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
            
            {/* Show mutation status */}
            {updateMutation.isError && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                Error: {updateMutation.error.message}
              </div>
            )}
            {updateMutation.isSuccess && (
              <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                Profile updated successfully!
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;