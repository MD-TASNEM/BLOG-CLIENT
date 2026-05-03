import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddLesson = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal Growth",
    emotionalTone: "Inspirational",
    visibility: "Public",
    accessLevel: "free",
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Personal Growth",
    "Career", 
    "Relationships",
    "Mindset",
    "Mistakes Learned",
    "Leadership",
    "Health & Wellness",
    "Finance",
    "Creativity",
    "Spirituality"
  ];

  const emotionalTones = [
    "Motivational",
    "Sad",
    "Realization",
    "Gratitude",
    "Professional",
    "Reflective",
    "Humorous",
    "Cautionary"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.title.trim() || !formData.description.trim()) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Check if user is trying to create premium lesson without premium subscription
      if (formData.accessLevel === "premium" && !userProfile?.isPremium) {
        toast.error("Upgrade to Premium to create paid lessons");
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("emotionalTone", formData.emotionalTone);
      submitData.append("visibility", formData.visibility);
      submitData.append("accessLevel", formData.accessLevel);
      
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // API call would go here
      // const response = await apiClient.post("/lessons", submitData, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // });

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Lesson created successfully!");
      navigate("/dashboard/my-lessons");
      
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range max-w-4xl">
        <div className="section-block">
          <h1 className="section-title">Create New Lesson</h1>
          <p className="text-gray-400">Share your wisdom and experiences with the community</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-2">Lesson Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter a compelling title for your lesson"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 mb-2">Lesson Content *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input resize-none"
                rows={8}
                placeholder="Share your story, insights, and lessons learned. Be detailed and authentic..."
                required
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.description.length} characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="block text-gray-300 mb-2">Emotional Tone</label>
              <select
                name="emotionalTone"
                value={formData.emotionalTone}
                onChange={handleInputChange}
                className="form-input"
              >
                {emotionalTones.map(tone => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-gray-300 mb-2">Visibility</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={formData.visibility === "Public"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Public - Everyone can see this lesson</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    checked={formData.visibility === "Private"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Private - Only you can see this lesson</span>
                </label>
              </div>
            </div>

            {/* Access Level */}
            <div>
              <label className="block text-gray-300 mb-2">Access Level</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accessLevel"
                    value="free"
                    checked={formData.accessLevel === "free"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Free - Available to all users</span>
                </label>
                <label className={`flex items-center ${!userProfile?.isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    type="radio"
                    name="accessLevel"
                    value="premium"
                    checked={formData.accessLevel === "premium"}
                    onChange={handleInputChange}
                    disabled={!userProfile?.isPremium}
                    className="mr-2"
                  />
                  <span className="text-gray-300">
                    Premium - Only Premium users can view
                    {!userProfile?.isPremium && (
                      <span className="text-gold ml-2">(Upgrade to Premium to enable)</span>
                    )}
                  </span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-300 mb-2">Featured Image (Optional)</label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full p-8 border-2 border-dashed border-navy-light rounded-lg cursor-pointer hover:border-gold transition-all"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-gray-400">Click to upload an image</p>
                    <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
                
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-navy-light">
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-lessons")}
                className="px-6 py-3 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="spinner mr-2"></span>
                    Creating Lesson...
                  </span>
                ) : (
                  "Publish Lesson"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="section-block card">
          <h3 className="text-xl font-semibold text-white mb-4">💡 Tips for Great Lessons</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              <span>Be authentic and share real experiences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              <span>Include specific examples and actionable insights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              <span>Keep your title compelling and descriptive</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              <span>Choose the right category and emotional tone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              <span>Add a relevant image to increase engagement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
