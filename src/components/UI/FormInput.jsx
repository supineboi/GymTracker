import { useState } from "react";
import styles from "./FormInput.module.css";
import { getValidationError, validateType } from "../../utils/formFieldsValidators";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  id,
  limitRange,
  allowedType = 'text',
  classes
}) => {
  const [error, setError] = useState();

  const blurHandler = (val, type, range) => {
    const errorMsg = getValidationError(val, type, range);

    if(errorMsg){
      setError(errorMsg)
    }
  }

  const changeHandler = (val, type) => {
    setError("");

    if (val === "" || val.trim() === "") {
      onChange("");
      return;
    }

    if(validateType(val, type)){
      onChange(val);
    }
  }

  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id}>{label}</label>}

      <div>
        <input
          id={id}
          type={type}
          value={value}
          onBlur={(e) => blurHandler(e.target.value, allowedType, limitRange)}
          onChange={(e) => changeHandler(e.target.value, allowedType)}
          placeholder={placeholder}
          {...classes ? { className: classes } : {}}
        />
        {
          error && (
            <span className={styles.formErrorMsg}>
              {error}
            </span>
          )
        }
      </div>
    </div>
  );
};

export default FormInput;
