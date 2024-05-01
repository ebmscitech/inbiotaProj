import { useField } from "formik";
// import { Input, Label } from "reactstrap";
import Proptypes from 'prop-types'
import { noValue } from "../../utils/validateInput";

const Input = ({ label, showLabel, required, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {!noValue(label) && showLabel ?
        <label className='mb-3 block text-base font-medium text-[#07074D]'>
          {label} {required && <span className="text-primary-400">*</span>}
        </label> : <></>
      }
      <input
        {...field}
        {...props}
        className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${meta.touched && meta.error ? "border-primary-400" : "border-[#e0e0e0]"}`}
        // invalid={meta.touched && meta.error}
      />
      {meta.touched && meta.error && <div className="error text-primary-400 text-sm">{!noValue(label) ? label.replace(/ *\([^)]*\) */g, "") + " " : ''}{meta.error}</div>}
    </>
  );
};
export default Input;

Input.defaultProps = {
  label: '',
  showLabel: true,
};

// ** PropTypes
Input.propTypes = {
  label: Proptypes.string,
  showLabel: Proptypes.bool,
}
