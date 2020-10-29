import React from "react";

const TextArea = ({ name, label, errors, ...rest }) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
      ></textarea>
      {errors && <div className="error-message">{errors}</div>}
    </React.Fragment>
  )
}

export default TextArea; 