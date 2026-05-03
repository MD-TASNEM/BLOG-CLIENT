import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell page-wrapper flex items-center justify-center px-3 md:px-6">
      <div className="text-center site-range max-w-2xl">
        {/* Cancel Icon */}
        <div className="text-6xl mb-6">💳</div>
        
        {/* Cancel Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          No worries! You can upgrade to Premium anytime when you're ready.
        </p>

        {/* What You Missed */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What You're Missing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Unlimited lesson creation</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Create premium lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Priority support</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Ad-free experience</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">✗</span>
              <span className="text-gray-400">Custom branding</span>
            </div>
          </div>
        </div>

        {/* Why Upgrade */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Why Upgrade to Premium?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-gold text-xl">💎</span>
              <div>
                <h3 className="text-white font-medium mb-1">Lifetime Access</h3>
                <p className="text-gray-400 text-sm">One-time payment of ৳1500 for lifetime access</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold text-xl">🚀</span>
              <div>
                <h3 className="text-white font-medium mb-1">Grow Your Audience</h3>
                <p className="text-gray-400 text-sm">Reach premium users and earn from your content</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold text-xl">📊</span>
              <div>
                <h3 className="text-white font-medium mb-1">Advanced Insights</h3>
                <p className="text-gray-400 text-sm">Understand your audience with detailed analytics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/pricing")}
            className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            Having trouble with payment? We're here to help.
          </p>
          <button className="text-gold hover:text-gold-dark transition-colors">
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
