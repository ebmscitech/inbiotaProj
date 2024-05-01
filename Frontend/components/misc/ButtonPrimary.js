import React from "react";

const ButtonPrimary = ({ children, addClass, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={
        "text-w-50 font-semibold rounded-lg bg-[#020230] hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
