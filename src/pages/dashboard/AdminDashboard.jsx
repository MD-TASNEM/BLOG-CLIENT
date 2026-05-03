import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    publicLessons: 0,
    premiumLessons: 0,
    reportedLessons: 0,
    todayUsers: 0,
    todayLessons: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentLessons, setRecentLessons] = useState([]);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    // Check if user is admin
    if (userProfile?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      return;
    }

    const fetchAdminData = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockStats = {
          totalUsers: 1247,
          totalLessons: 3456,
          publicLessons: 2890,
          premiumLessons: 566,
          reportedLessons: 12,
          todayUsers: 23,
          todayLessons: 45,
          totalRevenue: 1875000 // in BDT
        };

        const mockRecentUsers = [
          {
            uid: "user1",
            name: "Alice Johnson",
            email: "alice@example.com",
            isPremium: true,
            createdAt: "2024-01-20T10:30:00Z",
            totalLessons: 15
          },
          {
            uid: "user2",
            name: "Bob Smith",
            email: "bob@example.com",
            isPremium: false,
            createdAt: "2024-01-20T09:15:00Z",
            totalLessons: 3
          },
          {
            uid: "user3",
            name: "Carol Davis",
            email: "carol@example.com",
            isPremium: true,
            createdAt: "2024-01-20T08:45:00Z",
            totalLessons: 8
          }
        ];

        const mockRecentLessons = [
          {
            id: 1,
            title: "The Power of Vulnerability",
            creatorName: "Alice Johnson",
            category: "Personal Growth",
            visibility: "Public",
            accessLevel: "free",
            createdAt: "2024-01-20T14:30:00Z",
            likesCount: 234,
            reportedCount: 0
          },
          {
            id: 2,
            title: "Leading with Empathy",
            creatorName: "Bob Smith",
            category: "Leadership",
            visibility: "Public",
            accessLevel: "premium",
            createdAt: "2024-01-20T13:15:00Z",
            likesCount: 156,
            reportedCount: 2
          },
          {
            id: 3,
            title: "Finding Balance in Chaos",
            creatorName: "Carol Davis",
            category: "Mindfulness",
            visibility: "Public",
            accessLevel: "free",
            createdAt: "2024-01-20T11:45:00Z",
            likesCount: 89,
            reportedCount: 0
          }
        ];

        const mockTopContributors = [
          {
            uid: "user1",
            name: "Alice Johnson",
            totalLessons: 45,
            totalLikes: 2340,
            isPremium: true
          },
          {
            uid: "user2",
            name: "David Wilson",
            totalLessons: 38,
            totalLikes: 1890,
            isPremium: true
          },
          {
            uid: "user3",
            name: "Emma Brown",
            totalLessons: 32,
            totalLikes: 1567,
            isPremium: false
          },
          {
            uid: "user4",
            name: "Frank Miller",
            totalLessons: 28,
            totalLikes: 1234,
            isPremium: true
          },
          {
            uid: "user5",
            name: "Grace Lee",
            totalLessons: 25,
            totalLikes: 987,
            isPremium: false
          }
        ];

        setTimeout(() => {
          setStats(mockStats);
          setRecentUsers(mockRecentUsers);
          setRecentLessons(mockRecentLessons);
          setTopContributors(mockTopContributors);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load admin dashboard");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [userProfile]);

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
        <div className="section-block">
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="text-gray-400">Platform overview and system management</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Users</span>
              <span className="text-green-500 text-sm">+{stats.todayUsers} today</span>
            </div>
            <div className="text-3xl font-bold text-gold mb-1">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-gray-500 text-sm">Active users</div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Lessons</span>
              <span className="text-green-500 text-sm">+{stats.todayLessons} today</span>
            </div>
            <div className="text-3xl font-bold text-gold mb-1">{stats.totalLessons.toLocaleString()}</div>
            <div className="text-gray-500 text-sm">Published lessons</div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Reported Items</span>
              <span className="text-red-500 text-sm">⚠️</span>
            </div>
            <div className="text-3xl font-bold text-red-500 mb-1">{stats.reportedLessons}</div>
            <div className="text-gray-500 text-sm">Need review</div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Revenue</span>
              <span className="text-gold text-sm">৳</span>
            </div>
            <div className="text-3xl font-bold text-gold mb-1">{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-gray-500 text-sm">Premium sales</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-6">User Growth</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>User growth chart would go here</p>
                <p className="text-sm">Showing last 30 days</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-6">Lesson Activity</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>Lesson creation chart would go here</p>
                <p className="text-sm">Showing last 30 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Users */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Users</h3>
              <button className="text-gold hover:text-gold-dark transition-colors">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.uid} className="flex items-center justify-between pb-3 border-b border-navy-light last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center text-white font-bold">
                      {user.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{user.name}</span>
                        {user.isPremium && (
                          <span className="px-2 py-0.5 bg-gold/20 text-gold rounded-full text-xs">
                            ⭐ Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">{user.totalLessons} lessons</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Lessons */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Lessons</h3>
              <button className="text-gold hover:text-gold-dark transition-colors">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="pb-3 border-b border-navy-light last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{lesson.title}</h4>
                    {lesson.reportedCount > 0 && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full text-xs">
                        ⚠️ {lesson.reportedCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>by {lesson.creatorName}</span>
                    <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>{lesson.category}</span>
                    <span>❤️ {lesson.likesCount}</span>
                    <span className={lesson.accessLevel === "premium" ? "text-gold" : ""}>
                      {lesson.accessLevel === "premium" ? "⭐ Premium" : "🆓 Free"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Top Contributors</h3>
            <button className="text-gold hover:text-gold-dark transition-colors">
              View All →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-light">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Lessons</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Likes</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {topContributors.map((contributor, index) => (
                  <tr key={contributor.uid} className="border-b border-navy-light hover:bg-navy-light/20 transition-all">
                    <td className="py-3 px-4">
                      <span className={`font-bold ${
                        index === 0 ? "text-gold" : 
                        index === 1 ? "text-gray-300" : 
                        index === 2 ? "text-orange-600" : "text-gray-500"
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-navy-light rounded-full flex items-center justify-center text-white text-sm">
                          {contributor.name[0]}
                        </div>
                        <span className="text-white">{contributor.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">{contributor.totalLessons}</td>
                    <td className="py-3 px-4 text-white">{contributor.totalLikes.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contributor.isPremium 
                          ? "bg-gold/20 text-gold" 
                          : "bg-blue-500/20 text-blue-500"
                      }`}>
                        {contributor.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="card hover:border-gold transition-all text-left">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="text-white font-medium mb-1">Manage Users</h4>
            <p className="text-gray-400 text-sm">View and manage user accounts</p>
          </button>
          
          <button className="card hover:border-gold transition-all text-left">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="text-white font-medium mb-1">Manage Lessons</h4>
            <p className="text-gray-400 text-sm">Review and moderate content</p>
          </button>
          
          <button className="card hover:border-gold transition-all text-left relative">
            <div className="text-2xl mb-2">🚩</div>
            <h4 className="text-white font-medium mb-1">Reported Items</h4>
            <p className="text-gray-400 text-sm">Handle user reports</p>
            {stats.reportedLessons > 0 && (
              <span className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {stats.reportedLessons}
              </span>
            )}
          </button>
          
          <button className="card hover:border-gold transition-all text-left">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="text-white font-medium mb-1">Revenue</h4>
            <p className="text-gray-400 text-sm">View financial reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
