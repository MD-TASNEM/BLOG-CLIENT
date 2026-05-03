import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    department: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [adminStats, setAdminStats] = useState({
    totalActions: 0,
    lessonsReviewed: 0,
    usersManaged: 0,
    reportsHandled: 0,
    lastLogin: null,
    accountCreated: null
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
        department: userProfile.department || "",
        phone: userProfile.phone || ""
      });
      
      // Mock admin stats - replace with actual API call
      setAdminStats({
        totalActions: 156,
        lessonsReviewed: 89,
        usersManaged: 34,
        reportsHandled: 23,
        lastLogin: new Date().toISOString(),
        accountCreated: userProfile.createdAt || new Date().toISOString()
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      // await apiClient.patch("/admin/profile", formData);
      
      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await refreshUserProfile();
      setIsEditing(false);
      toast.success("Admin profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      bio: userProfile?.bio || "",
      department: userProfile?.department || "",
      phone: userProfile?.phone || ""
    });
    setIsEditing(false);
  };

  if (!userProfile || userProfile.role !== "admin") {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-6">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range max-w-6xl">
        {/* Header */}
        <div className="section-block">
          <h1 className="section-title">Admin Profile</h1>
          <p className="text-gray-400">Manage your administrator account and view activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full flex items-center justify-center text-red-500 font-bold text-3xl border-4 border-red-500/50">
                    {userProfile.name?.[0]?.toUpperCase() || userProfile.email[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs shadow-lg">
                    👑
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input text-center"
                      placeholder="Your name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input text-center"
                      placeholder="Your email"
                      disabled
                    />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="form-input text-center resize-none"
                      rows={3}
                      placeholder="Tell us about yourself"
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                      >
                        {loading ? <span className="spinner"></span> : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {userProfile.name || "Admin User"}
                    </h2>
                    <p className="text-gray-400 mb-4">{userProfile.email}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full text-sm">
                      <span>👑</span>
                      <span className="text-red-500 font-semibold">Administrator</span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Admin Stats */}
              <div className="border-t border-navy-light pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Admin Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Actions</span>
                    <span className="text-white">{adminStats.totalActions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lessons Reviewed</span>
                    <span className="text-white">{adminStats.lessonsReviewed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Users Managed</span>
                    <span className="text-white">{adminStats.usersManaged}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reports Handled</span>
                    <span className="text-white">{adminStats.reportsHandled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Login</span>
                    <span className="text-white">
                      {adminStats.lastLogin ? new Date(adminStats.lastLogin).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Settings */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Email Address</h4>
                  <p className="text-gray-400">{userProfile.email}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Email address cannot be changed for security reasons
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Department</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your department"
                    />
                  ) : (
                    <p className="text-gray-400">
                      {userProfile.department || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Phone Number</h4>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="text-gray-400">
                      {userProfile.phone || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Account Status</h4>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                      Active
                    </span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm">
                      Administrator
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Member Since</h4>
                  <p className="text-gray-400">
                    {adminStats.accountCreated ? new Date(adminStats.accountCreated).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Admin Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-navy-light">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-sm">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Approved lesson review</p>
                    <p className="text-gray-400 text-sm">Reviewed "The Power of Vulnerability" by Alice Johnson</p>
                    <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-navy-light">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 text-sm">
                    ✗
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Rejected user report</p>
                    <p className="text-gray-400 text-sm">Rejected report for "Leading with Empathy" by Bob Smith</p>
                    <p className="text-gray-500 text-xs mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-navy-light">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 text-sm">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Updated user role</p>
                    <p className="text-gray-400 text-sm">Changed Carol Davis to administrator role</p>
                    <p className="text-gray-500 text-xs mt-1">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Featured lesson</p>
                    <p className="text-gray-400 text-sm">Featured "The Art of Letting Go" by David Wilson</p>
                    <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Tools */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">Admin Tools</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 bg-navy-light rounded-lg hover:bg-navy-light/50 transition-all text-left">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="text-white font-medium mb-1">System Analytics</h4>
                  <p className="text-gray-400 text-sm">View detailed platform statistics</p>
                </button>
                
                <button className="p-4 bg-navy-light rounded-lg hover:bg-navy-light/50 transition-all text-left">
                  <div className="text-2xl mb-2">🔧</div>
                  <h4 className="text-white font-medium mb-1">System Settings</h4>
                  <p className="text-gray-400 text-sm">Configure platform settings</p>
                </button>
                
                <button className="p-4 bg-navy-light rounded-lg hover:bg-navy-light/50 transition-all text-left">
                  <div className="text-2xl mb-2">📝</div>
                  <h4 className="text-white font-medium mb-1">Activity Logs</h4>
                  <p className="text-gray-400 text-sm">View system activity logs</p>
                </button>
                
                <button className="p-4 bg-navy-light rounded-lg hover:bg-navy-light/50 transition-all text-left">
                  <div className="text-2xl mb-2">🚨</div>
                  <h4 className="text-white font-medium mb-1">Security Center</h4>
                  <p className="text-gray-400 text-sm">Manage security settings</p>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-2">Danger Zone</h3>
              <p className="text-gray-400 mb-6">
                These actions are irreversible and may affect the entire platform.
              </p>
              
              <div className="space-y-4">
                <button className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg font-medium hover:bg-red-500/30 transition-all">
                  Reset Admin Password
                </button>
                <button className="px-4 py-2 bg-red-600/20 text-red-600 rounded-lg font-medium hover:bg-red-600/30 transition-all">
                  Disable Admin Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
