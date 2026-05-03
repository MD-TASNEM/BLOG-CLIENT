import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef, useCallback } from "react";
import { auth } from "../config/firebase";

// Navigation Constants
const NAVIGATION_ITEMS = {
  main: [
    { to: "/", label: "Home", icon: "🏠", description: "Return to homepage" },
    { to: "/public-lessons", label: "Public Lessons", icon: "📖", description: "Discover new lessons" },
  ],
  authenticated: [
    { to: "/dashboard/add-lesson", label: "Add Lesson", icon: "➕", description: "Create new content" },
    { to: "/dashboard/my-lessons", label: "My Lessons", icon: "📚", description: "View your lessons" },
    { to: "/dashboard/my-favorites", label: "Favorites", icon: "❤️", description: "Saved content" },
  ],
  dashboard: [
    { to: "/dashboard/profile", label: "Profile", icon: "👤", description: "Manage your account" },
    { to: "/dashboard", label: "Dashboard", icon: "📊", description: "Analytics & overview" },
  ]
};

// Custom Hooks
const useScrollEffect = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

const useKeyboardNavigation = (isOpen, onClose) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
};

// Sub-components
const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 group"
    aria-label="Digital Lessons Homepage"
  >
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl group-hover:shadow-gold/20 transition-all duration-300 group-hover:scale-110">
        <span>DL</span>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal rounded-full border-2 border-navy-dark animate-pulse" />
    </div>
    <div className="hidden sm:flex flex-col">
      <span className="font-bold text-xl bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent group-hover:from-navy-light group-hover:to-gold-dark transition-all duration-300">
        Digital Lessons
      </span>
      <span className="text-xs text-gray-400 font-medium">
        Learn • Share • Grow
      </span>
    </div>
  </Link>
);

const NavLink = ({ to, icon, label, description, isActive }) => (
  <Link
    to={to}
    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
      isActive
        ? "text-navy bg-navy-light/15 shadow-sm"
        : "text-gray-400 hover:text-gold hover:bg-navy-light/10"
    }`}
    aria-label={`Navigate to ${label}${description ? ` - ${description}` : ''}`}
    title={description}
  >
    <span className="text-lg" aria-hidden="true">{icon}</span>
    <span>{label}</span>
    {isActive && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-navy to-gold rounded-full" />
    )}
  </Link>
);

const MobileNavLink = ({ to, icon, label, description, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-navy-light/20 text-gold"
        : "text-gray-300 hover:bg-navy-light/20 hover:text-gold"
    }`}
    aria-label={`Navigate to ${label}${description ? ` - ${description}` : ""}`}
  >
    <span className="text-lg" aria-hidden="true">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

const IconButton = ({ icon, label, onClick, isActive, badge }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
      isActive
        ? "bg-navy-light/15 text-gold"
        : "text-gray-400 hover:text-gold hover:bg-navy-light/10"
    }`}
  >
    <span className="text-xl" aria-hidden="true">{icon}</span>
    {badge && (
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

const ThemeToggle = ({ isDark, onToggle }) => (
  <IconButton
    icon={isDark ? "☀️" : "🌙"}
    label={`Switch to ${isDark ? "light" : "dark"} mode`}
    onClick={onToggle}
  />
);

const PremiumBadge = () => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-md">
    <span className="text-sm" aria-hidden="true">⭐</span>
    <span className="text-white font-bold text-sm">Premium</span>
  </div>
);

const UpgradeButton = () => (
  <Link
    to="/pricing"
    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy to-navy-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
    aria-label="Upgrade to premium account"
  >
    <span className="text-lg" aria-hidden="true">💎</span>
    <span>Upgrade</span>
  </Link>
);

const UserAvatar = ({ userProfile, currentUser, isPremium, onClick, isOpen }) => (
  <button
    onClick={onClick}
    aria-label="User menu"
    aria-expanded={isOpen}
    aria-haspopup="true"
    className="relative group focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-full"
  >
    <div className={`w-11 h-11 bg-gradient-to-br from-navy to-navy-light rounded-full flex items-center justify-center text-white font-semibold shadow-lg transition-all duration-300 ${
      isOpen ? "ring-2 ring-gold scale-105" : "group-hover:scale-105 group-hover:shadow-xl"
    }`}>
      {userProfile?.photoURL ? (
        <img
          src={userProfile.photoURL}
          alt={userProfile?.name || "User avatar"}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-lg font-bold">
          {userProfile?.name?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase()}
        </span>
      )}
    </div>
    {isPremium && (
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center text-xs shadow-lg animate-pulse">
        ⭐
      </div>
    )}
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal rounded-full" />
  </button>
);

const UserDropdown = ({ isOpen, userProfile, currentUser, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 w-80 bg-navy-dark rounded-2xl shadow-2xl border border-navy-light overflow-hidden animate-fadeIn z-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-navy to-navy-light p-5">
        <div className="flex items-center gap-4">
          {userProfile?.photoURL ? (
            <img
              src={userProfile.photoURL}
              alt={userProfile?.name || "User"}
              className="w-14 h-14 rounded-full object-cover border-2 border-gold/50 shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center text-navy font-bold text-2xl border-2 border-gold/50">
              {userProfile?.name?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{userProfile?.name || "User"}</h3>
            <p className="text-white/70 text-sm truncate">{currentUser?.email}</p>
            {userProfile?.isPremium && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/20 backdrop-blur-sm rounded-full text-xs font-medium">
                <span>⭐</span>
                <span className="text-gold font-semibold">Premium Member</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-2">
        {NAVIGATION_ITEMS.dashboard.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-navy-light rounded-xl transition-all duration-200 group"
            onClick={onClose}
          >
            <div className="w-9 h-9 bg-navy-light/20 rounded-lg flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors">
              <span className="text-lg">{link.icon}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-200">{link.label}</div>
              <div className="text-xs text-gray-400">{link.description}</div>
            </div>
            <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ))}

        {userProfile?.role === "admin" && (
          <Link
            to="/dashboard/admin"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-navy-light rounded-xl transition-all duration-200 group"
            onClick={onClose}
          >
            <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <span className="text-lg">🔧</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-200">Admin Panel</div>
              <div className="text-xs text-gray-400">System management</div>
            </div>
            <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
      </div>

      {/* Footer Section */}
      <div className="border-t border-navy-light p-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-navy-light rounded-xl transition-all duration-200 group"
          aria-label="Logout"
        >
          <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <span className="text-lg">🚪</span>
          </div>
          <div className="flex-1 text-left">
            <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors">
              Logout
            </span>
            <div className="text-xs text-gray-400">Sign out of your account</div>
          </div>
        </button>
      </div>
    </div>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="px-5 py-2 text-gray-300 hover:text-gold font-medium transition-colors rounded-lg hover:bg-navy-light/10"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-6 py-2 bg-gradient-to-r from-navy to-navy-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

// Main Navbar Component
export default function Navbar() {
  const { currentUser, userProfile } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const scrolled = useScrollEffect(20);

  // Close handlers
  useClickOutside(dropdownRef, () => setDropdownOpen(false));
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));
  useKeyboardNavigation(dropdownOpen, () => setDropdownOpen(false));

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      setDropdownOpen(false);
      localStorage.removeItem("authToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const isActivePath = useCallback((path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-dark/98 backdrop-blur-md border-b border-navy-light/50 shadow-2xl"
          : "bg-gradient-to-b from-navy-dark/80 to-transparent backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="site-range px-2 md:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Main Navigation Links */}
            <div className="flex items-center gap-1">
              {NAVIGATION_ITEMS.main.map((link) => (
                <NavLink
                  key={link.to}
                  {...link}
                  isActive={isActivePath(link.to)}
                />
              ))}
            </div>

            {/* Authenticated User Links */}
            {currentUser && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-navy-light/50">
                {NAVIGATION_ITEMS.authenticated.map((link) => (
                  <NavLink
                    key={link.to}
                    {...link}
                    isActive={isActivePath(link.to)}
                  />
                ))}
              </div>
            )}

            {/* Premium Section */}
            {currentUser && (
              <div className="ml-2">
                {userProfile?.isPremium ? (
                  <PremiumBadge />
                ) : (
                  <UpgradeButton />
                )}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-lg border border-navy-light/60 text-gray-300 hover:text-gold hover:border-gold/60 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            {/* Auth Section */}
            {!currentUser ? (
              <div className="hidden lg:block">
                <AuthButtons />
              </div>
            ) : (
              <div className="relative ml-2" ref={dropdownRef}>
                <UserAvatar
                  userProfile={userProfile}
                  currentUser={currentUser}
                  isPremium={userProfile?.isPremium}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  isOpen={dropdownOpen}
                />
                <UserDropdown
                  isOpen={dropdownOpen}
                  userProfile={userProfile}
                  currentUser={currentUser}
                  onClose={() => setDropdownOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-2 mb-3 rounded-2xl border border-navy-light/50 bg-navy-dark/95 backdrop-blur-xl p-3 shadow-2xl animate-fadeIn"
          >
            <div className="space-y-1">
              {NAVIGATION_ITEMS.main.map((link) => (
                <MobileNavLink
                  key={link.to}
                  {...link}
                  isActive={isActivePath(link.to)}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
              {currentUser && NAVIGATION_ITEMS.authenticated.map((link) => (
                <MobileNavLink
                  key={link.to}
                  {...link}
                  isActive={isActivePath(link.to)}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-navy-light/50">
              {!currentUser ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-4 py-2 rounded-lg border border-navy-light text-gray-300 hover:text-gold hover:border-gold transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-4 py-2 rounded-lg bg-gradient-to-r from-navy to-navy-light text-white hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  {userProfile?.isPremium ? <PremiumBadge /> : <UpgradeButton />}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn {
            animation: none;
          }
        }
      `}</style>
    </nav>
  );
}
