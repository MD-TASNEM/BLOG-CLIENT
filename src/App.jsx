import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLesson from "./pages/dashboard/AddLesson";
import MyLessons from "./pages/dashboard/MyLessons";
import UpdateLesson from "./pages/dashboard/UpdateLesson";
import PublicLessons from "./pages/PublicLessons";
import LessonDetails from "./pages/LessonDetails";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import MyFavorites from "./pages/dashboard/MyFavorites";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ManageUsers from "./pages/dashboard/AdminManageUsers";
import ManageLessons from "./pages/dashboard/AdminManageLessons";
import ReportedLessons from "./pages/dashboard/AdminReportedLessons";
import AdminProfile from "./pages/dashboard/AdminProfile";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const AppLayout = () => {
  const location = useLocation();
  const isNotFoundRoute = location.pathname === "/404";

  return (
    <>
      {!isNotFoundRoute && <Navbar />}
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-lessons" element={<PublicLessons />} />

          {/* Protected Routes */}
          <Route
            path="/lesson/:id"
            element={(
              <PrivateRoute>
                <LessonDetails />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/add-lesson"
            element={(
              <PrivateRoute>
                <AddLesson />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/my-lessons"
            element={(
              <PrivateRoute>
                <MyLessons />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/update-lesson/:id"
            element={(
              <PrivateRoute>
                <UpdateLesson />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/my-favorites"
            element={(
              <PrivateRoute>
                <MyFavorites />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/profile"
            element={(
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            )}
          />
          <Route
            path="/pricing"
            element={(
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            )}
          />
          <Route
            path="/payment/success"
            element={(
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            )}
          />
          <Route
            path="/payment/cancel"
            element={(
              <PrivateRoute>
                <PaymentCancel />
              </PrivateRoute>
            )}
          />

          {/* Admin Routes */}
          <Route
            path="/dashboard/admin"
            element={(
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/admin/manage-users"
            element={(
              <PrivateRoute>
                <ManageUsers />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/admin/manage-lessons"
            element={(
              <PrivateRoute>
                <ManageLessons />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/admin/reported-lessons"
            element={(
              <PrivateRoute>
                <ReportedLessons />
              </PrivateRoute>
            )}
          />
          <Route
            path="/dashboard/admin/profile"
            element={(
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            )}
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isNotFoundRoute && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-center" />
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
