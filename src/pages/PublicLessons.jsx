import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockLessons = [
      {
        id: 1,
        title: "The Power of Vulnerability",
        description: "Learning to be vulnerable transformed my relationships and career...",
        category: "Personal Growth",
        emotionalTone: "Inspirational",
        creator: { name: "Sarah Chen", photoURL: null },
        accessLevel: "free",
        createdAt: "2024-01-15",
        likesCount: 234,
        favoritesCount: 89
      },
      {
        id: 2,
        title: "Leading with Empathy",
        description: "How empathy became my greatest leadership tool in challenging times...",
        category: "Leadership",
        emotionalTone: "Professional",
        creator: { name: "Michael Rodriguez", photoURL: null },
        accessLevel: "premium",
        createdAt: "2024-01-12",
        likesCount: 156,
        favoritesCount: 67
      }
    ];

    setTimeout(() => {
      setLessons(mockLessons);
      setLoading(false);
    }, 1000);
  }, []);

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
        <div className="section-block">
          <h1 className="section-title">Public Lessons</h1>
          <p className="section-subtitle">
            Explore meaningful life lessons from the community with clean, readable cards and clear metadata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="card h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                {lesson.accessLevel === "premium" && (
                  <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                    Premium
                  </span>
                )}
              </div>
              
              <p className="text-gray-400 mb-4 line-clamp-3">{lesson.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="px-2 py-1 bg-navy-light rounded">{lesson.category}</span>
                <span>{lesson.emotionalTone}</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-navy-light rounded-full flex items-center justify-center text-white text-sm">
                    {lesson.creator.name[0]}
                  </div>
                  <span className="text-gray-400 text-sm">{lesson.creator.name}</span>
                </div>
                
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="text-gold hover:text-gold-dark transition-colors"
                >
                  View Details →
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-navy-light/80 text-sm text-gray-400">
                <span className="px-2 py-1 rounded-md bg-navy-light/50">❤️ {lesson.likesCount}</span>
                <span className="px-2 py-1 rounded-md bg-navy-light/50">🔖 {lesson.favoritesCount}</span>
                <span className="px-2 py-1 rounded-md bg-navy-light/50">{new Date(lesson.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
