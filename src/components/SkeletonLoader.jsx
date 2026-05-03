import React from "react";

const SkeletonLoader = ({ type = "card", count = 1, className = "" }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`card ${className}`}>
            <div className="animate-pulse">
              <div className="h-4 bg-navy-light rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-navy-light rounded w-full mb-2"></div>
              <div className="h-3 bg-navy-light rounded w-5/6 mb-2"></div>
              <div className="h-3 bg-navy-light rounded w-4/6"></div>
            </div>
          </div>
        );

      case "lesson":
        return (
          <div className={`card ${className}`}>
            <div className="animate-pulse">
              <div className="h-6 bg-navy-light rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-navy-light rounded w-full mb-2"></div>
              <div className="h-4 bg-navy-light rounded w-5/6 mb-4"></div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 bg-navy-light rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-navy-light rounded w-1/3 mb-1"></div>
                  <div className="h-2 bg-navy-light rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className={`space-y-3 ${className}`}>
            <div className="animate-pulse">
              <div className="h-4 bg-navy-light rounded w-full mb-2"></div>
              <div className="h-3 bg-navy-light rounded w-5/6"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-navy-light rounded w-full mb-2"></div>
              <div className="h-3 bg-navy-light rounded w-4/6"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-navy-light rounded w-full mb-2"></div>
              <div className="h-3 bg-navy-light rounded w-3/4"></div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className={`card ${className}`}>
            <div className="animate-pulse">
              <div className="h-4 bg-navy-light rounded w-full mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-4 bg-navy-light rounded w-1/4"></div>
                    <div className="h-4 bg-navy-light rounded w-1/3"></div>
                    <div className="h-4 bg-navy-light rounded w-1/6"></div>
                    <div className="h-4 bg-navy-light rounded w-1/5"></div>
                    <div className="h-4 bg-navy-light rounded w-1/8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "avatar":
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-12 h-12 bg-navy-light rounded-full"></div>
          </div>
        );

      case "text":
        return (
          <div className={`animate-pulse space-y-2 ${className}`}>
            <div className="h-3 bg-navy-light rounded w-full"></div>
            <div className="h-3 bg-navy-light rounded w-5/6"></div>
            <div className="h-3 bg-navy-light rounded w-4/6"></div>
          </div>
        );

      case "button":
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-10 bg-navy-light rounded-lg w-24"></div>
          </div>
        );

      case "input":
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-10 bg-navy-light rounded-lg w-full"></div>
          </div>
        );

      case "stats":
        return (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card text-center animate-pulse">
                <div className="h-8 bg-navy-light rounded w-16 mx-auto mb-2"></div>
                <div className="h-3 bg-navy-light rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        );

      case "hero":
        return (
          <div className={`min-h-screen bg-navy-dark pt-20 px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-12 bg-navy-light rounded w-3/4 mb-6"></div>
                <div className="h-6 bg-navy-light rounded w-1/2 mb-8"></div>
                <div className="h-16 bg-navy-light rounded w-full mb-8"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-navy-light rounded w-32"></div>
                  <div className="h-12 bg-navy-light rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "sidebar":
        return (
          <div className={`w-64 bg-navy-dark p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-navy-light rounded w-3/4"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-navy-light rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-navy-light rounded w-full"></div>
          </div>
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={index > 0 ? "mt-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
