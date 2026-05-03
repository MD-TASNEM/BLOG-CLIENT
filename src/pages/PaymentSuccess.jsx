import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Lottie from "lottie-react";
import apiClient from "../config/api";

const successAnimationData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 90,
  w: 220,
  h: 220,
  nm: "success-check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [110, 110, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100] },
            { t: 35, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [170, 170] } },
            { ty: "st", c: { a: 0, k: [0.02, 0.8, 0.45, 1] }, w: { a: 0, k: 10 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "check",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [110, 110, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 1,
                k: [
                  {
                    t: 0,
                    s: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                      ],
                      v: [
                        [-38, -2],
                        [-18, 20],
                        [36, -34],
                      ],
                      c: false,
                    },
                  },
                  {
                    t: 50,
                    s: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                      ],
                      v: [
                        [-38, -2],
                        [-18, 20],
                        [36, -34],
                      ],
                      c: false,
                    },
                  },
                ],
              },
            },
            { ty: "st", c: { a: 0, k: [0.95, 0.75, 0.15, 1] }, w: { a: 0, k: 12 }, lc: 2, lj: 2 },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 1, k: [{ t: 20, s: [0] }, { t: 55, s: [100] }] } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verify payment with backend
        await apiClient.post("/verify-payment");

        // Refresh user profile to get premium status
        await refreshUserProfile();

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        console.error("Payment verification failed:", error);
      }
    };

    verifyPayment();
  }, [navigate, refreshUserProfile]);

  return (
    <div className="page-shell page-wrapper flex items-center justify-center px-3 md:px-6">
      <div className="text-center site-range max-w-2xl">
        {/* Success Animation */}
        <div className="mb-8">
          <Lottie
            animationData={successAnimationData}
            loop={false}
            className="mx-auto h-52 w-52"
          />
        </div>

        {/* Success Message */}
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Welcome to Premium! You now have access to all exclusive features and
          content.
        </p>

        {/* Premium Benefits */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Your Premium Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Unlimited lesson creation</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Create premium lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Priority support</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Ad-free experience</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Custom branding</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard/add-lesson")}
            className="px-8 py-3 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
          >
            Create Premium Lesson
          </button>
        </div>

        {/* Auto-redirect Message */}
        <p className="text-gray-500 text-sm mt-8">
          Redirecting to dashboard in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
