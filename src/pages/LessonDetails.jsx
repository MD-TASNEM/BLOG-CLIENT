import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LessonDetails = () => {
  const { id } = useParams();
  const { currentUser, userProfile } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Mock data - replace with actual API call
        const mockLesson = {
          id: parseInt(id),
          title: "The Power of Vulnerability",
          description: "Learning to be vulnerable transformed my relationships and career in ways I never expected. This lesson explores how embracing vulnerability can lead to deeper connections and personal growth.",
          category: "Personal Growth",
          emotionalTone: "Inspirational",
          visibility: "Public",
          accessLevel: "free",
          featuredImage: null,
          creator: {
            uid: "user123",
            name: "Sarah Chen",
            photoURL: null,
            totalLessons: 12
          },
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
          likesCount: 234,
          favoritesCount: 89,
          viewsCount: Math.floor(Math.random() * 10000),
          likes: [],
          comments: [
            {
              id: 1,
              userId: "user456",
              userName: "John Doe",
              userPhoto: null,
              content: "This really resonated with me. Thank you for sharing!",
              createdAt: "2024-01-16T14:30:00Z"
            },
            {
              id: 2,
              userId: "user789",
              userName: "Jane Smith",
              userPhoto: null,
              content: "Beautifully written. I needed to hear this today.",
              createdAt: "2024-01-17T09:15:00Z"
            }
          ]
        };

        setLesson(mockLesson);
        
        // Check if current user liked or favorited this lesson
        if (currentUser) {
          setIsLiked(mockLesson.likes.includes(currentUser.uid));
          // Check favorites logic would go here
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        toast.error("Failed to load lesson");
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Please log in to like lessons");
      return;
    }

    try {
      if (isLiked) {
        setLesson(prev => ({
          ...prev,
          likesCount: prev.likesCount - 1,
          likes: prev.likes.filter(uid => uid !== currentUser.uid)
        }));
      } else {
        setLesson(prev => ({
          ...prev,
          likesCount: prev.likesCount + 1,
          likes: [...prev.likes, currentUser.uid]
        }));
      }
      setIsLiked(!isLiked);
      
      // API call would go here
      // await apiClient.post(`/lessons/${id}/like`);
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleFavorite = async () => {
    if (!currentUser) {
      toast.error("Please log in to save lessons");
      return;
    }

    try {
      if (isFavorited) {
        setLesson(prev => ({
          ...prev,
          favoritesCount: prev.favoritesCount - 1
        }));
      } else {
        setLesson(prev => ({
          ...prev,
          favoritesCount: prev.favoritesCount + 1
        }));
      }
      setIsFavorited(!isFavorited);
      
      // API call would go here
      // await apiClient.post(`/lessons/${id}/favorite`);
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  const handleReport = async () => {
    if (!currentUser) {
      toast.error("Please log in to report lessons");
      return;
    }

    if (!reportReason) {
      toast.error("Please select a reason for reporting");
      return;
    }

    try {
      // API call would go here
      // await apiClient.post(`/lessons/${id}/report`, { reason: reportReason });
      toast.success("Lesson reported successfully");
      setShowReportModal(false);
      setReportReason("");
    } catch (error) {
      toast.error("Failed to report lesson");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson.title,
        text: lesson.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Lesson not found</h2>
          <Link to="/public-lessons" className="text-gold hover:text-gold-dark">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  // Check if premium content and user is not premium
  if (lesson.accessLevel === "premium" && !userProfile?.isPremium) {
    return (
      <div className="page-shell page-wrapper px-3 md:px-6">
        <div className="site-range max-w-4xl">
          <div className="card text-center py-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Premium Lesson</h2>
            <p className="text-gray-300 mb-8">
              This lesson is available for Premium members only. Upgrade to access exclusive content.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Upgrade to Premium
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range max-w-4xl">
        {/* Lesson Header */}
        <div className="section-block">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
              {lesson.category}
            </span>
            <span className="text-gray-400">{lesson.emotionalTone}</span>
            {lesson.accessLevel === "premium" && (
              <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                Premium
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{lesson.title}</h1>
          
          {/* Author Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-white font-bold">
                {lesson.creator.name[0]}
              </div>
              <div>
                <p className="text-white font-semibold">{lesson.creator.name}</p>
                <p className="text-gray-400 text-sm">{lesson.creator.totalLessons} lessons</p>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="card section-block">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Stats & Engagement */}
        <div className="card section-block">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2 text-gray-300 bg-navy-light/30 rounded-lg px-3 py-2">
                <span>❤️</span>
                <span>{lesson.likesCount.toLocaleString()} Likes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 bg-navy-light/30 rounded-lg px-3 py-2">
                <span>🔖</span>
                <span>{lesson.favoritesCount.toLocaleString()} Favorites</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 bg-navy-light/30 rounded-lg px-3 py-2">
                <span>👀</span>
                <span>{lesson.viewsCount.toLocaleString()} Views</span>
              </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isLiked
                  ? "bg-red-500/20 text-red-500 border border-red-500"
                  : "bg-navy-light text-gray-300 hover:text-gold border border-navy-light"
              }`}
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span>{isLiked ? "Liked" : "Like"}</span>
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isFavorited
                  ? "bg-gold/20 text-gold border border-gold"
                  : "bg-navy-light text-gray-300 hover:text-gold border border-navy-light"
              }`}
            >
              <span>{isFavorited ? "🔖" : "📌"}</span>
              <span>{isFavorited ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-gold border border-navy-light transition-all"
            >
              <span>📤</span>
              <span>Share</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-red-500 border border-navy-light transition-all"
            >
              <span>🚩</span>
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card section-block">
          <h3 className="text-xl font-semibold text-white mb-6">Comments ({lesson.comments.length})</h3>
          
          {currentUser && (
            <div className="mb-6">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-4 bg-navy-light border border-navy rounded-lg text-white resize-none focus:outline-none focus:border-gold"
                rows="3"
              />
              <button className="mt-2 px-4 py-2 bg-gold text-navy-dark rounded-lg font-medium hover:bg-gold-dark transition-all">
                Post Comment
              </button>
            </div>
          )}

          <div className="space-y-4">
            {lesson.comments.map((comment) => (
              <div key={comment.id} className="border-b border-navy-light pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-navy-light rounded-full flex items-center justify-center text-white text-sm">
                    {comment.userName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{comment.userName}</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Lessons */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">Similar Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mock similar lessons */}
            <div className="border border-navy-light rounded-lg p-4 hover:border-gold transition-all">
              <h4 className="text-white font-medium mb-2">Building Resilience</h4>
              <p className="text-gray-400 text-sm mb-2">How to bounce back from setbacks...</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Personal Growth</span>
                <span className="text-gold text-sm">Read More →</span>
              </div>
            </div>
            <div className="border border-navy-light rounded-lg p-4 hover:border-gold transition-all">
              <h4 className="text-white font-medium mb-2">The Art of Letting Go</h4>
              <p className="text-gray-400 text-sm mb-2">Finding freedom in release...</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Mindfulness</span>
                <span className="text-gold text-sm">Read More →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-navy-dark rounded-2xl p-6 max-w-md w-full border border-navy-light">
            <h3 className="text-xl font-semibold text-white mb-4">Report Lesson</h3>
            
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-3 bg-navy-light border border-navy rounded-lg text-white mb-4 focus:outline-none focus:border-gold"
            >
              <option value="">Select a reason</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="harassment">Hate Speech or Harassment</option>
              <option value="misleading">Misleading or False Information</option>
              <option value="spam">Spam or Promotional Content</option>
              <option value="disturbing">Sensitive or Disturbing Content</option>
              <option value="other">Other</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleReport}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                Report
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
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
  );
};

export default LessonDetails;
