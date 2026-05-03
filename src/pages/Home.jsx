import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);

  // Hero slider data
  const heroSlides = [
    {
      title: "Share Your Wisdom",
      description: "Transform your life experiences into valuable lessons that inspire others",
      image: "🎯",
      cta: "Start Sharing",
      link: "/dashboard/add-lesson"
    },
    {
      title: "Learn from Others",
      description: "Discover powerful insights and life lessons from our global community",
      image: "📚",
      cta: "Explore Lessons",
      link: "/public-lessons"
    },
    {
      title: "Grow Together",
      description: "Join a community dedicated to personal growth and continuous learning",
      image: "🌱",
      cta: "Join Community",
      link: "/register"
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: "🧠",
      title: "Preserve Wisdom",
      description: "Never forget valuable life lessons and insights that shape who you are"
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "Connect with like-minded individuals on similar growth journeys"
    },
    {
      icon: "📈",
      title: "Measure Growth",
      description: "Track your personal development and see how far you've come"
    },
    {
      icon: "🌟",
      title: "Inspire Others",
      description: "Your experiences can become someone else's guidance and motivation"
    }
  ];

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // Mock data for now - replace with actual API calls
        setFeaturedLessons([
          { id: 1, title: "The Power of Vulnerability", author: "Sarah Chen", category: "Personal Growth" },
          { id: 2, title: "Leading with Empathy", author: "Michael Rodriguez", category: "Leadership" },
          { id: 3, title: "Finding Balance in Chaos", author: "Emma Thompson", category: "Mindfulness" }
        ]);
        
        setTopContributors([
          { name: "Sarah Chen", lessons: 45, avatar: "👩‍💼" },
          { name: "Michael Rodriguez", lessons: 38, avatar: "👨‍💼" },
          { name: "Emma Thompson", lessons: 32, avatar: "👩‍🎓" }
        ]);
        
        setMostSavedLessons([
          { id: 1, title: "The Art of Letting Go", saves: 1234 },
          { id: 2, title: "Building Resilience", saves: 987 },
          { id: 3, title: "Mindful Leadership", saves: 856 }
        ]);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen page-shell">
      {/* Hero Section */}
      <section className="pt-28 pb-12 px-6 lg:px-8">
        <div className="site-range">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="hero-swiper"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="text-center py-16 md:py-20 px-4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl shadow-black/20">
                  <div className="text-7xl md:text-8xl mb-8">{slide.image}</div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-teal-light to-gold bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    {slide.cta}
                    <span>→</span>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="site-range">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            Featured Life Lessons
          </h2>
          <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Curated stories that inspire thoughtful growth and better life decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLessons.map((lesson) => (
              <div key={lesson.id} className="card h-full flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                  <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                    {lesson.category}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">By {lesson.author}</p>
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learning From Life Matters Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="site-range">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Build better habits, think clearly, and move forward with lessons that truly matter.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="site-range">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            Top Contributors of the Week
          </h2>
          <p className="text-gray-300 text-center mb-10">
            Community members creating the most impact this week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topContributors.map((contributor, index) => (
              <div key={index} className="card text-center h-full">
                <div className="text-5xl mb-4">{contributor.avatar}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{contributor.name}</h3>
                <p className="text-gray-400">{contributor.lessons} Lessons Shared</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                    #{index + 1} Contributor
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Saved Lessons Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="site-range">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            Most Saved Lessons
          </h2>
          <p className="text-gray-300 text-center mb-10">
            Lessons the community keeps coming back to.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostSavedLessons.map((lesson, index) => (
              <div key={lesson.id} className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gold">#{index + 1}</span>
                    <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>❤️</span>
                  <span>{lesson.saves.toLocaleString()} saves</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="site-range">
          <div className="max-w-4xl mx-auto text-center card border-gold/20 overflow-hidden">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 break-words">
            Ready to Share Your Story?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 px-1">
            Join thousands of people who are transforming their experiences into wisdom that inspires others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <span>→</span>
              </Link>
              <Link
                to="/public-lessons"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 border-2 border-gold text-gold rounded-lg font-semibold text-base sm:text-lg hover:bg-gold hover:text-navy transition-all duration-300"
              >
                Browse Lessons
                <span>🔍</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
