import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

const CustomCheckbox = ({ label, name, required, ...props }) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div className="mb-3">
      <div className="checkbox">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            {...field}
            {...props}
            className={
              meta.touched && meta.error
                ? "input-error border-0 rounded text-blueGray-700 w-5 h-5 ease-linear transition-all duration-150"
                : "border-0 rounded text-blueGray-700 w-5 h-5 ease-linear transition-all duration-150"
            }
          />
          <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
            {label} {required && <span className="text-primary-400">*</span>}
          </span>
        </label>
      </div>

      {meta.touched && meta.error && (
        <div className="error text-primary-400 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default CustomCheckbox;
