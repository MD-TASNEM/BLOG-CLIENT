import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "Public Lessons", href: "/public-lessons" },
      { name: "Pricing", href: "/pricing" },
    ],
    resources: [
      { name: "Add Lesson", href: "/dashboard/add-lesson" },
      { name: "My Lessons", href: "/dashboard/my-lessons" },
      { name: "Favorites", href: "/dashboard/my-favorites" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/404" },
      { name: "Privacy Policy", href: "/404" },
      { name: "Cookie Policy", href: "/404" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: "𝕏", href: "https://twitter.com" },
    { name: "LinkedIn", icon: "in", href: "https://linkedin.com" },
    { name: "GitHub", icon: "GH", href: "https://github.com" },
    { name: "Instagram", icon: "📷", href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-navy-light/80 mt-auto">
      <div className="site-range py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center text-white font-bold text-lg">
                <span>DL</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Digital Lessons</h3>
                <p className="text-xs text-gray-400">Learn • Share • Grow</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              A platform where wisdom meets technology. Share your life lessons, 
              learn from others, and grow together in a community dedicated to personal development.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-navy-light rounded-lg flex items-center justify-center text-gray-400 hover:text-gold hover:bg-navy transition-all duration-300 border border-transparent hover:border-gold/40"
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-navy-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Digital Lessons. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-400">Made with care for learners worldwide</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-gray-400">System Status: Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
