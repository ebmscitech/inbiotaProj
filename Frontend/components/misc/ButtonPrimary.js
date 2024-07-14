import React from "react";

const ButtonPrimary = ({ children, addClass, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={
        "bg-gradient-custom text-white-500 font-bold rounded-lg hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
