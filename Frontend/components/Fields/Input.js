import React, { useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { noValue } from '../../utils/validateInput';
import { Eye24Filled, EyeOff24Filled } from '@fluentui/react-icons';

const Input = ({ label, showLabel, required, labelColor = "text-[#07074D]", type = 'text', ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const inputClasses = `w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-warning-400 focus:shadow-md ${meta.touched && meta.error ? 'border-danger-400' : 'border-[#e0e0e0]'
    }`;

  return (
    <div className="flex flex-col">
      {!noValue(label) && showLabel && (
        <label className={`mb-3 block text-base font-medium ${labelColor}`}>
          {label} {required && <span className="text-primary-400">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          className={inputClasses}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500"
          >
            {showPassword ? <Eye24Filled /> : <EyeOff24Filled />}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="error text-primary-400 text-sm">
          {!noValue(label) ? label.replace(/ *\([^)]*\) */g, '') + ' ' : ''}
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default Input;

Input.defaultProps = {
  label: '',
  showLabel: true,
  type: 'text',
};

// ** PropTypes
Input.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
};
