import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminManageUsers = () => {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    // Check if user is admin
    if (userProfile?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      return;
    }

    const fetchUsers = async () => {
      try {
        // Mock data - replace with actual API call
        const mockUsers = [
          {
            uid: "user1",
            name: "Alice Johnson",
            email: "alice@example.com",
            isPremium: true,
            role: "user",
            totalLessons: 15,
            totalLikes: 234,
            createdAt: "2024-01-15T10:00:00Z",
            lastActive: "2024-01-20T14:30:00Z",
            status: "active"
          },
          {
            uid: "user2",
            name: "Bob Smith",
            email: "bob@example.com",
            isPremium: false,
            role: "user",
            totalLessons: 3,
            totalLikes: 45,
            createdAt: "2024-01-12T09:15:00Z",
            lastActive: "2024-01-19T16:45:00Z",
            status: "active"
          },
          {
            uid: "user3",
            name: "Carol Davis",
            email: "carol@example.com",
            isPremium: true,
            role: "admin",
            totalLessons: 8,
            totalLikes: 156,
            createdAt: "2024-01-10T14:20:00Z",
            lastActive: "2024-01-20T11:30:00Z",
            status: "active"
          },
          {
            uid: "user4",
            name: "David Wilson",
            email: "david@example.com",
            isPremium: false,
            role: "user",
            totalLessons: 12,
            totalLikes: 189,
            createdAt: "2024-01-08T16:30:00Z",
            lastActive: "2024-01-18T09:15:00Z",
            status: "inactive"
          },
          {
            uid: "user5",
            name: "Emma Brown",
            email: "emma@example.com",
            isPremium: true,
            role: "user",
            totalLessons: 25,
            totalLikes: 567,
            createdAt: "2024-01-05T11:45:00Z",
            lastActive: "2024-01-20T13:20:00Z",
            status: "active"
          }
        ];

        setTimeout(() => {
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userProfile]);

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;

    try {
      // API call would go here
      // await apiClient.patch(`/users/${selectedUser.uid}/role`, { role: newRole });
      
      setUsers(prev => prev.map(user => 
        user.uid === selectedUser.uid 
          ? { ...user, role: newRole }
          : user
      ));
      
      toast.success(`User role updated to ${newRole}`);
      setShowRoleModal(false);
      setSelectedUser(null);
      setNewRole("");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (user) => {
    if (!confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      // API call would go here
      // await apiClient.delete(`/users/${user.uid}`);
      
      setUsers(prev => prev.filter(u => u.uid !== user.uid));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === "all") return matchesSearch;
      if (filter === "premium") return matchesSearch && user.isPremium;
      if (filter === "free") return matchesSearch && !user.isPremium;
      if (filter === "admin") return matchesSearch && user.role === "admin";
      if (filter === "active") return matchesSearch && user.status === "active";
      if (filter === "inactive") return matchesSearch && user.status === "inactive";
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "lessons") return b.totalLessons - a.totalLessons;
      if (sortBy === "likes") return b.totalLikes - a.totalLikes;
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
            <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
            <p className="text-gray-400">View and manage all registered users</p>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Total: {users.length}</span>
            <span>•</span>
            <span>Premium: {users.filter(u => u.isPremium).length}</span>
            <span>•</span>
            <span>Admin: {users.filter(u => u.role === "admin").length}</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card section-block">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
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
                <option value="all">All Users</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
                <option value="admin">Admin</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
                <option value="name">Name</option>
                <option value="lessons">Lessons</option>
                <option value="likes">Likes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-light">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Lessons</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Likes</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Active</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedUsers.map((user) => (
                  <tr key={user.uid} className="border-b border-navy-light hover:bg-navy-light/20 transition-all">
                    <td className="py-4 px-4">
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
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-blue-500/20 text-blue-500"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4 text-white">{user.totalLessons}</td>
                    <td className="py-4 px-4 text-white">{user.totalLikes}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openRoleModal(user)}
                          className="px-3 py-1 bg-navy-light text-gray-300 rounded text-sm hover:text-white transition-all"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
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

          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
              <p className="text-gray-400">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "No users registered yet"
                }
              </p>
            </div>
          )}
        </div>

        {/* Role Change Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
            <div className="bg-navy-dark rounded-2xl p-6 max-w-md w-full border border-navy-light">
              <h3 className="text-xl font-semibold text-white mb-4">Change User Role</h3>
              
              <div className="mb-4">
                <p className="text-gray-300 mb-2">
                  User: <span className="text-white font-medium">{selectedUser.name}</span>
                </p>
                <p className="text-gray-400 text-sm">{selectedUser.email}</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">New Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-light border border-navy rounded-lg text-white focus:outline-none focus:border-gold"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRoleChange}
                  className="flex-1 px-4 py-2 bg-gold text-navy-dark rounded-lg font-medium hover:bg-gold-dark transition-all"
                >
                  Update Role
                </button>
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                    setNewRole("");
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

export default AdminManageUsers;
