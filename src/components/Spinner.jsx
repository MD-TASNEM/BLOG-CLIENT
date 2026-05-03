import React from "react";

const Spinner = ({ size = "medium", color = "gold", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16"
  };

  const colorClasses = {
    gold: "border-gold",
    white: "border-white",
    gray: "border-gray-400",
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500"
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.medium}
        ${colorClasses[color] || colorClasses.gold}
        border-2 border-t-transparent
        rounded-full
        animate-spin
        ${className}
      `}
    />
  );
};

export default Spinner;
