import styles from "./FormInput.module.css";

const FormInput = ({
  label,
  type = "text",
  allowOnly,
  value,
  onChange,
  placeholder = "",
  id,
  classes
}) => {
  const validationHandler = (val) => {
    if (val === "" || val.trim() === "") {
      onChange("");
      return;
    }

    const patterns = {
      decimal: /^\d*\.?\d*$/,
      integer: /^\d+$/,
      alpha: /^[A-Za-z ]+$/
    };

    const regex = patterns[allowOnly];

    if (!regex || regex.test(val)) {
      onChange(val);
    }
  };


  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id}>{label}</label>}

      <div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => validationHandler(e.target.value)}
          placeholder={placeholder}
          {...classes ? { className: classes } : {}}
        />
        {/* <span className={styles.formErrorMsg}>
          please enter correct one.</span> */}
      </div>
    </div>
  );
};

export default FormInput;
