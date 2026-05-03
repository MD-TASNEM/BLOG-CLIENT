import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminManageLessons = () => {
  const { userProfile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (userProfile?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      return;
    }

    const fetchLessons = async () => {
      try {
        // Mock data - replace with actual API call
        const mockLessons = [
          {
            id: 1,
            title: "The Power of Vulnerability",
            description: "Learning to be vulnerable transformed my relationships and career...",
            creatorName: "Alice Johnson",
            creatorEmail: "alice@example.com",
            creatorUid: "user1",
            category: "Personal Growth",
            emotionalTone: "Inspirational",
            visibility: "Public",
            accessLevel: "free",
            isFeatured: true,
            isReviewed: true,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z",
            likesCount: 234,
            favoritesCount: 89,
            viewsCount: 1567,
            reportedCount: 0,
            status: "published"
          },
          {
            id: 2,
            title: "Leading with Empathy",
            description: "How empathy became my greatest leadership tool in challenging times...",
            creatorName: "Bob Smith",
            creatorEmail: "bob@example.com",
            creatorUid: "user2",
            category: "Leadership",
            emotionalTone: "Professional",
            visibility: "Public",
            accessLevel: "premium",
            isFeatured: false,
            isReviewed: false,
            createdAt: "2024-01-12T14:30:00Z",
            updatedAt: "2024-01-13T09:15:00Z",
            likesCount: 156,
            favoritesCount: 67,
            viewsCount: 892,
            reportedCount: 2,
            status: "published"
          },
          {
            id: 3,
            title: "Finding Balance in Chaos",
            description: "My journey to mindfulness in a busy world full of distractions...",
            creatorName: "Carol Davis",
            creatorEmail: "carol@example.com",
            creatorUid: "user3",
            category: "Mindfulness",
            emotionalTone: "Reflective",
            visibility: "Private",
            accessLevel: "free",
            isFeatured: false,
            isReviewed: true,
            createdAt: "2024-01-10T16:45:00Z",
            updatedAt: "2024-01-10T16:45:00Z",
            likesCount: 0,
            favoritesCount: 0,
            viewsCount: 0,
            reportedCount: 0,
            status: "published"
          },
          {
            id: 4,
            title: "The Art of Letting Go",
            description: "Finding freedom in release and embracing new beginnings...",
            creatorName: "David Wilson",
            creatorEmail: "david@example.com",
            creatorUid: "user4",
            category: "Personal Growth",
            emotionalTone: "Motivational",
            visibility: "Public",
            accessLevel: "premium",
            isFeatured: true,
            isReviewed: true,
            createdAt: "2024-01-08T11:20:00Z",
            updatedAt: "2024-01-08T11:20:00Z",
            likesCount: 445,
            favoritesCount: 178,
            viewsCount: 2341,
            reportedCount: 1,
            status: "published"
          },
          {
            id: 5,
            title: "Building Resilience",
            description: "How to bounce back from setbacks and grow stronger through adversity...",
            creatorName: "Emma Brown",
            creatorEmail: "emma@example.com",
            creatorUid: "user5",
            category: "Career",
            emotionalTone: "Inspirational",
            visibility: "Public",
            accessLevel: "free",
            isFeatured: false,
            isReviewed: false,
            createdAt: "2024-01-05T09:30:00Z",
            updatedAt: "2024-01-05T09:30:00Z",
            likesCount: 289,
            favoritesCount: 134,
            viewsCount: 1876,
            reportedCount: 3,
            status: "published"
          }
        ];

        setTimeout(() => {
          setLessons(mockLessons);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("Failed to load lessons");
        setLoading(false);
      }
    };

    fetchLessons();
  }, [userProfile]);

  const handleToggleFeatured = async (lessonId) => {
    try {
      // API call would go here
      // await apiClient.patch(`/lessons/${lessonId}/featured`);
      
      setLessons(prev => prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, isFeatured: !lesson.isFeatured }
          : lesson
      ));
      
      const lesson = lessons.find(l => l.id === lessonId);
      toast.success(`Lesson ${lesson.isFeatured ? "removed from" : "added to"} featured`);
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const handleToggleReviewed = async (lessonId) => {
    try {
      // API call would go here
      // await apiClient.patch(`/lessons/${lessonId}/reviewed`);
      
      setLessons(prev => prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, isReviewed: !lesson.isReviewed }
          : lesson
      ));
      
      const lesson = lessons.find(l => l.id === lessonId);
      toast.success(`Lesson marked as ${lesson.isReviewed ? "unreviewed" : "reviewed"}`);
    } catch (error) {
      toast.error("Failed to update review status");
    }
  };

  const handleDeleteLesson = async () => {
    if (!selectedLesson) return;

    try {
      // API call would go here
      // await apiClient.delete(`/lessons/${selectedLesson.id}`);
      
      setLessons(prev => prev.filter(lesson => lesson.id !== selectedLesson.id));
      toast.success("Lesson deleted successfully");
      setShowDeleteModal(false);
      setSelectedLesson(null);
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  const openDeleteModal = (lesson) => {
    setSelectedLesson(lesson);
    setShowDeleteModal(true);
  };

  // Filter and sort lessons
  const filteredAndSortedLessons = lessons
    .filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === "all") return matchesSearch;
      if (filter === "public") return matchesSearch && lesson.visibility === "Public";
      if (filter === "private") return matchesSearch && lesson.visibility === "Private";
      if (filter === "free") return matchesSearch && lesson.accessLevel === "free";
      if (filter === "premium") return matchesSearch && lesson.accessLevel === "premium";
      if (filter === "featured") return matchesSearch && lesson.isFeatured;
      if (filter === "reported") return matchesSearch && lesson.reportedCount > 0;
      if (filter === "unreviewed") return matchesSearch && !lesson.isReviewed;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "likes") return b.likesCount - a.likesCount;
      if (sortBy === "views") return b.viewsCount - a.viewsCount;
      if (sortBy === "reports") return b.reportedCount - a.reportedCount;
      return 0;
    });

  if (userProfile?.role !== "admin") {
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Lessons</h1>
            <p className="text-gray-400">Review and moderate all lessons on the platform</p>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Total: {lessons.length}</span>
            <span>•</span>
            <span>Public: {lessons.filter(l => l.visibility === "Public").length}</span>
            <span>•</span>
            <span>Featured: {lessons.filter(l => l.isFeatured).length}</span>
            <span>•</span>
            <span>Reported: {lessons.filter(l => l.reportedCount > 0).length}</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card section-block">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search lessons by title, description, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-navy-light border border-navy rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Filter */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-navy-light border border-navy rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="all">All Lessons</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="featured">Featured</option>
                <option value="reported">Reported</option>
                <option value="unreviewed">Unreviewed</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-navy-light border border-navy rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
                <option value="reports">Most Reported</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-light">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Lesson</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Creator</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Access</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Stats</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedLessons.map((lesson) => (
                  <tr key={lesson.id} className="border-b border-navy-light hover:bg-navy-light/20 transition-all">
                    <td className="py-4 px-4">
                      <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium truncate">{lesson.title}</h4>
                          {lesson.isFeatured && (
                            <span className="px-2 py-0.5 bg-gold/20 text-gold rounded-full text-xs">
                              ⭐ Featured
                            </span>
                          )}
                          {lesson.reportedCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full text-xs">
                              ⚠️ {lesson.reportedCount}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">{lesson.description}</p>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white text-sm">{lesson.creatorName}</p>
                        <p className="text-gray-400 text-xs">{lesson.creatorEmail}</p>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-navy-light rounded text-sm text-gray-300">
                        {lesson.category}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          lesson.visibility === "Public"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {lesson.visibility}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          lesson.accessLevel === "premium"
                            ? "bg-gold/20 text-gold"
                            : "bg-blue-500/20 text-blue-500"
                        }`}>
                          {lesson.accessLevel === "premium" ? "⭐ Premium" : "🆓 Free"}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          lesson.isReviewed
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {lesson.isReviewed ? "✓ Reviewed" : "⏳ Pending"}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(lesson.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-400">
                        <div>❤️ {lesson.likesCount}</div>
                        <div>🔖 {lesson.favoritesCount}</div>
                        <div>👀 {lesson.viewsCount}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleFeatured(lesson.id)}
                            className={`px-2 py-1 rounded text-xs transition-all ${
                              lesson.isFeatured
                                ? "bg-gold/20 text-gold hover:bg-gold/30"
                                : "bg-navy-light text-gray-300 hover:text-white"
                            }`}
                          >
                            {lesson.isFeatured ? "Unfeature" : "Feature"}
                          </button>
                          <button
                            onClick={() => handleToggleReviewed(lesson.id)}
                            className={`px-2 py-1 rounded text-xs transition-all ${
                              lesson.isReviewed
                                ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                                : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                            }`}
                          >
                            {lesson.isReviewed ? "Unreview" : "Review"}
                          </button>
                        </div>
                        <button
                          onClick={() => openDeleteModal(lesson)}
                          className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-xs hover:bg-red-500/30 transition-all"
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

          {filteredAndSortedLessons.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
              <p className="text-gray-400">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "No lessons have been created yet"
                }
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedLesson && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
            <div className="bg-navy-dark rounded-2xl p-6 max-w-md w-full border border-navy-light">
              <h3 className="text-xl font-semibold text-white mb-4">Delete Lesson</h3>
              
              <div className="mb-4">
                <p className="text-gray-300 mb-2">
                  Are you sure you want to delete this lesson?
                </p>
                <div className="bg-navy-light rounded-lg p-3">
                  <h4 className="text-white font-medium">{selectedLesson.title}</h4>
                  <p className="text-gray-400 text-sm">by {selectedLesson.creatorName}</p>
                </div>
                <p className="text-red-500 text-sm mt-2">
                  This action cannot be undone and will remove all associated data.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDeleteLesson}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                >
                  Delete Lesson
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedLesson(null);
                  }}
                  className="flex-1 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageLessons;
