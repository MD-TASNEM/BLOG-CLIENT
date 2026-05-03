import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyLessons = () => {
  const { currentUser, userProfile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMyLessons = async () => {
      try {
        // Mock data - replace with actual API call
        const mockLessons = [
          {
            id: 1,
            title: "The Power of Vulnerability",
            description: "Learning to be vulnerable transformed my relationships...",
            category: "Personal Growth",
            emotionalTone: "Inspirational",
            visibility: "Public",
            accessLevel: "free",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z",
            likesCount: 234,
            favoritesCount: 89,
            viewsCount: 1567,
            status: "published"
          },
          {
            id: 2,
            title: "Leading with Empathy",
            description: "How empathy became my greatest leadership tool...",
            category: "Leadership",
            emotionalTone: "Professional",
            visibility: "Public",
            accessLevel: "premium",
            createdAt: "2024-01-12T14:30:00Z",
            updatedAt: "2024-01-13T09:15:00Z",
            likesCount: 156,
            favoritesCount: 67,
            viewsCount: 892,
            status: "published"
          },
          {
            id: 3,
            title: "Finding Balance in Chaos",
            description: "My journey to mindfulness in a busy world...",
            category: "Mindfulness",
            emotionalTone: "Reflective",
            visibility: "Private",
            accessLevel: "free",
            createdAt: "2024-01-10T16:45:00Z",
            updatedAt: "2024-01-10T16:45:00Z",
            likesCount: 0,
            favoritesCount: 0,
            viewsCount: 0,
            status: "draft"
          }
        ];

        setTimeout(() => {
          setLessons(mockLessons);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("Failed to load your lessons");
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchMyLessons();
    }
  }, [currentUser]);

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      return;
    }

    try {
      // API call would go here
      // await apiClient.delete(`/lessons/${lessonId}`);
      
      setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
      toast.success("Lesson deleted successfully");
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  const handleToggleVisibility = async (lessonId) => {
    try {
      const lesson = lessons.find(l => l.id === lessonId);
      const newVisibility = lesson.visibility === "Public" ? "Private" : "Public";
      
      // API call would go here
      // await apiClient.patch(`/lessons/${lessonId}`, { visibility: newVisibility });
      
      setLessons(prev => prev.map(l => 
        l.id === lessonId ? { ...l, visibility: newVisibility } : l
      ));
      toast.success(`Lesson visibility changed to ${newVisibility}`);
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const handleToggleAccessLevel = async (lessonId) => {
    if (!userProfile?.isPremium) {
      toast.error("Upgrade to Premium to change access level");
      return;
    }

    try {
      const lesson = lessons.find(l => l.id === lessonId);
      const newAccessLevel = lesson.accessLevel === "free" ? "premium" : "free";
      
      // API call would go here
      // await apiClient.patch(`/lessons/${lessonId}`, { accessLevel: newAccessLevel });
      
      setLessons(prev => prev.map(l => 
        l.id === lessonId ? { ...l, accessLevel: newAccessLevel } : l
      ));
      toast.success(`Access level changed to ${newAccessLevel}`);
    } catch (error) {
      toast.error("Failed to update access level");
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    if (filter === "all") return true;
    if (filter === "published") return lesson.status === "published";
    if (filter === "draft") return lesson.status === "draft";
    if (filter === "public") return lesson.visibility === "Public";
    if (filter === "private") return lesson.visibility === "Private";
    if (filter === "free") return lesson.accessLevel === "free";
    if (filter === "premium") return lesson.accessLevel === "premium";
    return true;
  });

  if (loading) {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 section-block">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Lessons</h1>
            <p className="text-gray-400">Manage and track your life lessons</p>
          </div>
          
          <Link
            to="/dashboard/add-lesson"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>➕</span>
            <span>Create New Lesson</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 section-block">
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">{lessons.length}</div>
            <div className="text-gray-400">Total Lessons</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {lessons.filter(l => l.visibility === "Public").length}
            </div>
            <div className="text-gray-400">Public Lessons</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {lessons.reduce((sum, l) => sum + l.likesCount, 0)}
            </div>
            <div className="text-gray-400">Total Likes</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {lessons.reduce((sum, l) => sum + l.viewsCount, 0)}
            </div>
            <div className="text-gray-400">Total Views</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card section-block">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light text-gray-300 hover:text-white"
              }`}
            >
              All ({lessons.length})
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "published"
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light text-gray-300 hover:text-white"
              }`}
            >
              Published ({lessons.filter(l => l.status === "published").length})
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "draft"
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light text-gray-300 hover:text-white"
              }`}
            >
              Drafts ({lessons.filter(l => l.status === "draft").length})
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "public"
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light text-gray-300 hover:text-white"
              }`}
            >
              Public ({lessons.filter(l => l.visibility === "Public").length})
            </button>
            <button
              onClick={() => setFilter("private")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "private"
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light text-gray-300 hover:text-white"
              }`}
            >
              Private ({lessons.filter(l => l.visibility === "Private").length})
            </button>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="card">
          {filteredLessons.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
              <p className="text-gray-400 mb-6">
                {filter === "all" 
                  ? "You haven't created any lessons yet. Start sharing your wisdom!"
                  : `No lessons match the current filter: ${filter}`
                }
              </p>
              {filter === "all" && (
                <Link
                  to="/dashboard/add-lesson"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>➕</span>
                  <span>Create Your First Lesson</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-light">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Lesson</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Visibility</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Access</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Stats</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.map((lesson) => (
                    <tr key={lesson.id} className="border-b border-navy-light hover:bg-navy-light/20 transition-all">
                      <td className="py-4 px-4">
                        <div>
                          <h4 className="text-white font-medium mb-1">{lesson.title}</h4>
                          <p className="text-gray-400 text-sm line-clamp-1">{lesson.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Created {new Date(lesson.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-navy-light rounded text-sm text-gray-300">
                          {lesson.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleVisibility(lesson.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            lesson.visibility === "Public"
                              ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                              : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                          }`}
                        >
                          {lesson.visibility === "Public" ? "🌐 Public" : "🔒 Private"}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleAccessLevel(lesson.id)}
                          disabled={!userProfile?.isPremium}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            lesson.accessLevel === "premium"
                              ? "bg-gold/20 text-gold hover:bg-gold/30"
                              : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
                          } ${!userProfile?.isPremium ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {lesson.accessLevel === "premium" ? "⭐ Premium" : "🆓 Free"}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 text-sm text-gray-400">
                          <span>❤️ {lesson.likesCount}</span>
                          <span>🔖 {lesson.favoritesCount}</span>
                          <span>👀 {lesson.viewsCount}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/lesson/${lesson.id}`}
                            className="px-3 py-1 bg-navy-light text-gray-300 rounded text-sm hover:text-white transition-all"
                          >
                            View
                          </Link>
                          <Link
                            to={`/dashboard/update-lesson/${lesson.id}`}
                            className="px-3 py-1 bg-gold/20 text-gold rounded text-sm hover:bg-gold/30 transition-all"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-500 rounded text-sm hover:bg-red-500/30 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
