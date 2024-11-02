import { useField } from "formik";
import Proptypes from 'prop-types';

const RadioInput = ({ label, options, name, required, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    return (
        <div className="mb-3">
            {!label ? null : (
                <label className='mb-3 block text-base font-medium text-[#07074D]'>
                    {label} {required && <span className="text-primary-400">*</span>}
                </label>
            )}
            <div className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 justify-items-start items-center">
                {options.map((option) => (
                    <div key={option.value} className="grid justify-items-center">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    checked={field.value === option.value}
                                    className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    onChange={() => setValue(option.value)}
                                    {...props}
                                />
                                <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                    {option.label}
                                </span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            {meta.touched && meta.error && (
                <div className="error text-primary-400 text-sm">
                    {label ? label.replace(/ *\([^)]*\) */g, "") + " " : ''}{meta.error}
                </div>
            )}
        </div>
    );
};

RadioInput.propTypes = {
    label: Proptypes.string,
    options: Proptypes.arrayOf(Proptypes.shape({
        value: Proptypes.string.isRequired,
        label: Proptypes.string.isRequired
    })).isRequired,
    name: Proptypes.string.isRequired,
    required: Proptypes.bool
};

export default RadioInput;

// usages
{/* <RadioInput
label="Lembaga"
name="lembaga"
options={[
    { value: "DPR", label: "DPR" },
    { value: "DPD", label: "DPD" },
    { value: "DPRD Provinsi", label: "DPRD Provinsi" },
    { value: "DPRD Kota / Kabupaten", label: "DPRD Kota / Kabupaten" }
]}
required
/> */}