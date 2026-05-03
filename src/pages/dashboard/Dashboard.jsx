import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range">
        <h1 className="section-title section-block">
          Welcome back, {userProfile?.name || "User"}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Total Lessons</h3>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Favorites</h3>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Views</h3>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Likes</h3>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
