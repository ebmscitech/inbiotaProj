import React from "react";

const Badge = ({ children, addClass, onClick, color, ...props }) => {
  return (
    <span className={`relative inline-block px-3 py-1 font-semibold text-${color}-500 leading-tight`} onClick={onClick}>
      <span aria-hidden className={`absolute inset-0 bg-${color}-500 opacity-50 rounded-full ${addClass}`} {...props}></span>
      <span className="relative">
        {children}
      </span>
    </span>
  );
};

export default Badge;
