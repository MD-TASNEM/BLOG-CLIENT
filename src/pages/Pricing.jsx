import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import apiClient from "../config/api";
import toast from "react-hot-toast";

const Pricing = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const features = {
    free: [
      { name: "Create up to 10 lessons", included: true },
      { name: "Basic lesson creation tools", included: true },
      { name: "Public lesson sharing", included: true },
      { name: "Community features", included: true },
      { name: "Basic analytics", included: true },
      { name: "Create premium lessons", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Priority support", included: false },
      { name: "Ad-free experience", included: false },
      { name: "Custom branding", included: false },
      { name: "API access", included: false },
      { name: "Export lessons", included: false }
    ],
    premium: [
      { name: "Unlimited lessons", included: true },
      { name: "Advanced lesson creation tools", included: true },
      { name: "Public & private lesson sharing", included: true },
      { name: "Premium community features", included: true },
      { name: "Advanced analytics & insights", included: true },
      { name: "Create premium lessons", included: true },
      { name: "Priority listing in search", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Ad-free experience", included: true },
      { name: "Custom profile branding", included: true },
      { name: "API access for developers", included: true },
      { name: "Export lessons (PDF, Markdown)", included: true }
    ]
  };

  const handleUpgrade = async () => {
    if (!userProfile) {
      toast.error("Please log in to upgrade");
      return;
    }

    setLoading(true);

    try {
      // Create Stripe checkout session
      const response = await apiClient.post("/create-checkout-session", {
        plan: "premium",
        billingCycle: billingCycle
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        toast.error("Failed to redirect to checkout");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  // If user is already premium, show success state
  if (userProfile?.isPremium) {
    return (
      <div className="page-shell page-wrapper px-3 md:px-6">
        <div className="site-range max-w-4xl">
          <div className="text-center py-12">
            <div className="text-6xl mb-6">⭐</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              You're a Premium Member!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for supporting Digital Lessons. Enjoy all your premium benefits!
            </p>
            
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Your Premium Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {features.premium.filter(f => f.included).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-300">{feature.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-navy-light">
                <p className="text-gray-400 mb-4">
                  Need help with your premium account? Contact our support team.
                </p>
                <button className="px-6 py-3 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range">
        {/* Header */}
        <div className="text-center section-block">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock the full potential of Digital Lessons with our Premium features. 
            Share unlimited wisdom and grow with our supportive community.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 p-1 rounded-xl bg-navy-light/30 border border-navy-light/70">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                billingCycle === "monthly" ? "bg-gold text-navy-dark" : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly (Demo)
            </button>
            <button
              onClick={() => setBillingCycle("lifetime")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                billingCycle === "lifetime" ? "bg-gold text-navy-dark" : "text-gray-300 hover:text-white"
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 section-block">
          {/* Free Plan */}
          <div className="card relative h-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-4">Perfect for getting started</p>
              <div className="text-4xl font-bold text-white">
                $0<span className="text-lg text-gray-400">/month</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.free.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className={`text-lg ${feature.included ? "text-green-500" : "text-gray-600"}`}>
                    {feature.included ? "✓" : "✗"}
                  </span>
                  <span className={`text-sm ${feature.included ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <button
              disabled={true}
              className="w-full px-6 py-3 bg-navy-light text-gray-400 rounded-lg font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="card relative border-2 border-gold h-full">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-gold to-gold-dark text-white rounded-full text-sm font-semibold">
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-8 mt-4">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-4">For serious life learners</p>
              <div className="text-4xl font-bold text-gold">
                ৳1500<span className="text-lg text-gray-400">/{billingCycle === "lifetime" ? "lifetime" : "month"}</span>
              </div>
              <p className="text-green-500 text-sm mt-2">
                {billingCycle === "lifetime"
                  ? "One-time payment, lifetime access"
                  : "Demo monthly label for UI interaction"}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {features.premium.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-lg text-green-500">✓</span>
                  <span className="text-sm text-gray-300">{feature.name}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="spinner mr-2"></span>
                  Processing...
                </span>
              ) : (
                "Upgrade to Premium"
              )}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card section-block">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-300">
                We accept all major credit cards, debit cards, and digital payment methods 
                through our secure Stripe payment processor.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Is the Premium plan really one-time payment?
              </h3>
              <p className="text-gray-300">
                Yes! Premium is a one-time payment of ৳1500 for lifetime access. 
                No monthly or annual subscriptions required.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I cancel my Premium subscription?
              </h3>
              <p className="text-gray-300">
                Since Premium is a one-time payment, there's no subscription to cancel. 
                You keep lifetime access to all Premium features.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                What happens to my lessons if I don't upgrade?
              </h3>
              <p className="text-gray-300">
                Your free lessons remain accessible forever. Premium features like creating 
                premium lessons and advanced analytics require an upgrade.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Is my payment information secure?
              </h3>
              <p className="text-gray-300">
                Absolutely. We use Stripe, a industry-leading payment processor with 
                bank-level security to handle all transactions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I get a refund?
              </h3>
              <p className="text-gray-300">
                We offer a 30-day money-back guarantee. If you're not satisfied with 
                Premium, contact us within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="section-block">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What Our Premium Members Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                  SC
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sarah Chen</h4>
                  <p className="text-gray-400 text-sm">Life Coach</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Premium features have transformed how I share my coaching insights. 
                The analytics help me understand what resonates with my audience."
              </p>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-gold">⭐</span>
                ))}
              </div>
            </div>

            <div className="card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                  MR
                </div>
                <div>
                  <h4 className="text-white font-semibold">Michael Rodriguez</h4>
                  <p className="text-gray-400 text-sm">CEO</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The ability to create premium lessons has opened up new revenue streams. 
                Best investment I've made for my personal brand."
              </p>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-gold">⭐</span>
                ))}
              </div>
            </div>

            <div className="card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                  ET
                </div>
                <div>
                  <h4 className="text-white font-semibold">Emma Thompson</h4>
                  <p className="text-gray-400 text-sm">Author</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The ad-free experience and priority support make creating content a joy. 
                Worth every penny for serious content creators."
              </p>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-gold">⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Upgrade Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Premium members who are sharing their wisdom and growing 
            together in our supportive community.
          </p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="spinner mr-2"></span>
                Processing...
              </span>
            ) : (
              <>
                <span>💎</span>
                <span>Upgrade to Premium Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
