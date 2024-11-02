import React from "react";

const ButtonSecondary = ({ children, addClass, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={
        "px-5 lg:px-7 text-secondary-600 font-semibold rounded-lg bg-secondary-100 hover:shadow-xl transition-all outline-none " +
        addClass
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
