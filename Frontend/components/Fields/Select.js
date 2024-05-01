import { useField } from "formik";
import { Label } from "reactstrap";
import Select, { components } from "react-select"; //eslint-disable-line
import classnames from 'classnames'
import { noValue } from "@utils/validateInput";

const CustomSelect = ({ label, showLabel, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {/* <Label className='form-label'>
        {label}
      </Label>
      <select
        {...field}
        {...props}
        onInvalid={meta.touched && meta.error}
        className="form-select cursor-pointer"
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
      {!noValue(label) && showLabel ? 
        <Label className='form-label'>
          {label}
        </Label> : <></>
      }
      <Select
        {...field}
        {...props}
        isClearable
        classNamePrefix='select'
        className={classnames('react-select', { 'is-invalid': meta.touched && meta.error })}
      />
      {meta.touched && meta.error && <div className="error text-danger">{!noValue(label)? label.replace(/ *\([^)]*\) */g, "")+" ": ''}{meta.error}</div>}
    </>
  );
};
export default CustomSelect;
