import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyFavorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Mock data - replace with actual API call
        const mockFavorites = [
          {
            id: 1,
            lessonId: 1,
            lesson: {
              id: 1,
              title: "The Power of Vulnerability",
              description:
                "Learning to be vulnerable transformed my relationships and career in ways I never expected...",
              category: "Personal Growth",
              emotionalTone: "Inspirational",
              creator: {
                uid: "user123",
                name: "Sarah Chen",
                photoURL: null,
              },
              accessLevel: "free",
              createdAt: "2024-01-15T10:00:00Z",
              likesCount: 234,
              favoritesCount: 89,
              viewsCount: 1567,
            },
            favoritedAt: "2024-01-16T14:30:00Z",
          },
          {
            id: 2,
            lessonId: 2,
            lesson: {
              id: 2,
              title: "Leading with Empathy",
              description:
                "How empathy became my greatest leadership tool in challenging times and difficult situations...",
              category: "Leadership",
              emotionalTone: "Professional",
              creator: {
                uid: "user456",
                name: "Michael Rodriguez",
                photoURL: null,
              },
              accessLevel: "premium",
              createdAt: "2024-01-12T14:30:00Z",
              likesCount: 156,
              favoritesCount: 67,
              viewsCount: 892,
            },
            favoritedAt: "2024-01-17T09:15:00Z",
          },
          {
            id: 3,
            lessonId: 3,
            lesson: {
              id: 3,
              title: "Finding Balance in Chaos",
              description:
                "My journey to mindfulness and finding inner peace in a chaotic world full of distractions...",
              category: "Mindfulness",
              emotionalTone: "Reflective",
              creator: {
                uid: "user789",
                name: "Emma Thompson",
                photoURL: null,
              },
              accessLevel: "free",
              createdAt: "2024-01-10T16:45:00Z",
              likesCount: 289,
              favoritesCount: 145,
              viewsCount: 2341,
            },
            favoritedAt: "2024-01-18T11:20:00Z",
          },
        ];

        setTimeout(() => {
          setFavorites(mockFavorites);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load your favorites");
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      // API call would go here
      // await apiClient.delete(`/favorites/${favoriteId}`);

      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove from favorites");
    }
  };

  const handleRemoveAllFavorites = async () => {
    if (
      !confirm(
        "Are you sure you want to remove all favorites? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      // API call would go here
      // await apiClient.delete("/favorites/all");

      setFavorites([]);
      toast.success("All favorites removed");
    } catch (error) {
      toast.error("Failed to remove all favorites");
    }
  };

  // Filter and sort favorites
  const filteredAndSortedFavorites = favorites
    .filter((fav) => {
      if (filter === "all") return true;
      if (filter === "free") return fav.lesson.accessLevel === "free";
      if (filter === "premium") return fav.lesson.accessLevel === "premium";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.favoritedAt) - new Date(a.favoritedAt);
      }
      if (sortBy === "title") {
        return a.lesson.title.localeCompare(b.lesson.title);
      }
      if (sortBy === "category") {
        return a.lesson.category.localeCompare(b.lesson.category);
      }
      if (sortBy === "likes") {
        return b.lesson.likesCount - a.lesson.likesCount;
      }
      return 0;
    });

  const categories = [...new Set(favorites.map((fav) => fav.lesson.category))];

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
            <h1 className="text-3xl font-bold text-white mb-2">My Favorites</h1>
            <p className="text-gray-400">Lessons you've saved for later</p>
          </div>

          <div className="flex gap-3">
            {favorites.length > 0 && (
              <button
                onClick={handleRemoveAllFavorites}
                className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg font-medium hover:bg-red-500/30 transition-all"
              >
                Clear All
              </button>
            )}
            <Link
              to="/public-lessons"
              className="px-4 py-2 bg-gold text-navy-dark rounded-lg font-medium hover:bg-gold-dark transition-all"
            >
              Discover More
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 section-block">
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {favorites.length}
            </div>
            <div className="text-gray-400">Total Favorites</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {categories.length}
            </div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {
                favorites.filter((fav) => fav.lesson.accessLevel === "premium")
                  .length
              }
            </div>
            <div className="text-gray-400">Premium Lessons</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {favorites.reduce((sum, fav) => sum + fav.lesson.likesCount, 0)}
            </div>
            <div className="text-gray-400">Total Likes</div>
          </div>
        </div>

        {/* Filters and Sort */}
        {favorites.length > 0 && (
          <div className="card section-block">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-400 text-sm mb-2">
                  Filter by Access
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filter === "all"
                        ? "bg-gold text-navy-dark"
                        : "bg-navy-light text-gray-300 hover:text-white"
                    }`}
                  >
                    All ({favorites.length})
                  </button>
                  <button
                    onClick={() => setFilter("free")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filter === "free"
                        ? "bg-gold text-navy-dark"
                        : "bg-navy-light text-gray-300 hover:text-white"
                    }`}
                  >
                    Free (
                    {
                      favorites.filter(
                        (fav) => fav.lesson.accessLevel === "free",
                      ).length
                    }
                    )
                  </button>
                  <button
                    onClick={() => setFilter("premium")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filter === "premium"
                        ? "bg-gold text-navy-dark"
                        : "bg-navy-light text-gray-300 hover:text-white"
                    }`}
                  >
                    Premium (
                    {
                      favorites.filter(
                        (fav) => fav.lesson.accessLevel === "premium",
                      ).length
                    }
                    )
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 bg-navy-light border border-navy rounded-lg text-white text-sm focus:outline-none focus:border-gold"
                >
                  <option value="recent">Recently Favorited</option>
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Favorites List */}
        <div className="card">
          {filteredAndSortedFavorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {favorites.length === 0
                  ? "No favorites yet"
                  : "No favorites match your filters"}
              </h3>
              <p className="text-gray-400 mb-6">
                {favorites.length === 0
                  ? "Start exploring and save lessons that inspire you!"
                  : "Try adjusting your filters to see more favorites."}
              </p>
              {favorites.length === 0 && (
                <Link
                  to="/public-lessons"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>🔍</span>
                  <span>Explore Lessons</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="border border-navy-light rounded-lg p-6 hover:border-gold transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {favorite.lesson.title}
                        </h3>
                        {favorite.lesson.accessLevel === "premium" && (
                          <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                            Premium
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {favorite.lesson.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="px-2 py-1 bg-navy-light rounded">
                          {favorite.lesson.category}
                        </span>
                        <span>{favorite.lesson.emotionalTone}</span>
                        <span>
                          Favorited{" "}
                          {new Date(favorite.favoritedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-navy-light rounded-full flex items-center justify-center text-white text-xs">
                              {favorite.lesson.creator.name[0]}
                            </div>
                            <span>{favorite.lesson.creator.name}</span>
                          </div>
                          <span>❤️ {favorite.lesson.likesCount}</span>
                          <span>🔖 {favorite.lesson.favoritesCount}</span>
                          <span>👀 {favorite.lesson.viewsCount}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/lesson/${favorite.lesson.id}`}
                            className="px-3 py-1 bg-navy-light text-gray-300 rounded text-sm hover:text-white transition-all"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleRemoveFavorite(favorite.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-500 rounded text-sm hover:bg-red-500/30 transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        {favorites.length > 0 && (
          <div className="section-block card">
            <h3 className="text-xl font-semibold text-white mb-6">
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mock recommendations based on categories */}
              {categories.slice(0, 3).map((category, index) => (
                <div
                  key={index}
                  className="border border-navy-light rounded-lg p-4 hover:border-gold transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">
                      More {category} Lessons
                    </h4>
                    <span className="text-gold">→</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Discover more lessons in {category} that match your
                    interests
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
