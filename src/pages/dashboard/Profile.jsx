import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser, userProfile, refreshUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: ""
  });
  const [loading, setLoading] = useState(false);
  const [userLessons, setUserLessons] = useState([]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        photoURL: userProfile.photoURL || ""
      });
      fetchUserLessons();
    }
  }, [userProfile]);

  const fetchUserLessons = async () => {
    try {
      // Mock data - replace with actual API call
      const mockLessons = [
        {
          id: 1,
          title: "The Power of Vulnerability",
          category: "Personal Growth",
          visibility: "Public",
          accessLevel: "free",
          likesCount: 234,
          favoritesCount: 89,
          createdAt: "2024-01-15T10:00:00Z"
        },
        {
          id: 2,
          title: "Leading with Empathy",
          category: "Leadership",
          visibility: "Public",
          accessLevel: "premium",
          likesCount: 156,
          favoritesCount: 67,
          createdAt: "2024-01-12T14:30:00Z"
        }
      ];
      setUserLessons(mockLessons);
    } catch (error) {
      console.error("Error fetching user lessons:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, just set a mock URL
      setFormData(prev => ({
        ...prev,
        photoURL: URL.createObjectURL(file)
      }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      // await apiClient.patch("/users/profile", formData);
      
      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await refreshUserProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || "",
      photoURL: userProfile?.photoURL || ""
    });
    setIsEditing(false);
  };

  if (!userProfile) {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range max-w-6xl">
        {/* Header */}
        <div className="section-block">
          <h1 className="section-title">My Profile</h1>
          <p className="text-gray-400">Manage your account and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gold/50"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center text-navy font-bold text-3xl border-4 border-gold/50">
                      {userProfile.name?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()}
                    </div>
                  )}
                  {userProfile.isPremium && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center text-xs shadow-lg">
                      ⭐
                    </div>
                  )}
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
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-image-upload"
                      />
                      <label
                        htmlFor="profile-image-upload"
                        className="cursor-pointer text-gold hover:text-gold-dark transition-colors"
                      >
                        Change Photo
                      </label>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="px-4 py-2 bg-gold text-navy-dark rounded-lg font-medium hover:bg-gold-dark transition-all disabled:opacity-50"
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
                      {userProfile.name || "User"}
                    </h2>
                    <p className="text-gray-400 mb-4">{currentUser.email}</p>
                    {userProfile.isPremium && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 rounded-full text-sm">
                        <span>⭐</span>
                        <span className="text-gold font-semibold">Premium Member</span>
                      </div>
                    )}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-navy-light pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white">
                      {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Lessons</span>
                    <span className="text-white">{userLessons.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Likes</span>
                    <span className="text-white">
                      {userLessons.reduce((sum, lesson) => sum + lesson.likesCount, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Type</span>
                    <span className="text-gold">
                      {userProfile.isPremium ? "Premium" : "Free"}
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
                  <p className="text-gray-400">{currentUser.email}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Email address cannot be changed for security reasons
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Account Status</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      userProfile.isPremium 
                        ? "bg-gold/20 text-gold" 
                        : "bg-blue-500/20 text-blue-500"
                    }`}>
                      {userProfile.isPremium ? "Premium" : "Free"}
                    </span>
                    {!userProfile.isPremium && (
                      <button
                        onClick={() => window.location.href = "/pricing"}
                        className="text-gold hover:text-gold-dark transition-colors"
                      >
                        Upgrade to Premium →
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Role</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      userProfile.role === "admin"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {userProfile.role === "admin" ? "Administrator" : "User"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Lessons */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Lessons</h3>
                <button
                  onClick={() => window.location.href = "/dashboard/my-lessons"}
                  className="text-gold hover:text-gold-dark transition-colors"
                >
                  View All →
                </button>
              </div>

              {userLessons.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-400 mb-4">You haven't created any lessons yet</p>
                  <button
                    onClick={() => window.location.href = "/dashboard/add-lesson"}
                    className="px-4 py-2 bg-gold text-navy-dark rounded-lg font-medium hover:bg-gold-dark transition-all"
                  >
                    Create Your First Lesson
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userLessons.slice(0, 3).map((lesson) => (
                    <div key={lesson.id} className="border border-navy-light rounded-lg p-4 hover:border-gold transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{lesson.title}</h4>
                        <div className="flex gap-2">
                          {lesson.accessLevel === "premium" && (
                            <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                              Premium
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lesson.visibility === "Public"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-gray-500/20 text-gray-400"
                          }`}>
                            {lesson.visibility}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span>{lesson.category}</span>
                        <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>❤️ {lesson.likesCount}</span>
                        <span>🔖 {lesson.favoritesCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="card border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-2">Danger Zone</h3>
              <p className="text-gray-400 mb-6">
                These actions are irreversible. Please be careful.
              </p>
              
              <div className="space-y-4">
                <button className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg font-medium hover:bg-red-500/30 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
