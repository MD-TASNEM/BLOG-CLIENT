import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark px-6">
      <div className="text-center">
        <div className="text-9xl mb-8">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-300 mb-8">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Go Home
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
