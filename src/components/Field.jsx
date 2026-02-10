import { useEffect, useState } from "react"

const errorMessages = {
    'text' : 'This field can not be empty',
    'number' : 'Must have 10 digits only',
    'email' : 'Please enter a valid email address',
    'date' : 'Date format'
}

const fieldPatterns = {
    'number' : '^[0-9]{10}$',
    'email' : '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
}

/* eslint-disable react/prop-types */
export default function Field({fieldName, fieldType,_ref, isRequired, isInvalid}) {
    const [value , setValue] = useState(_ref?.current  || "");

    useEffect(() => setValue(_ref.current), [_ref.current]);
    
    return (
        <div className={` mb-3`} >
            <label htmlFor={`${fieldName}-${fieldType}`} className="form-label">
                {fieldName}{isRequired ? <span className="text-red-600">*</span> : ""}
            </label>
            <input 
                required={isRequired ? true : false}
                type={fieldType} 
                className={`form-control${isInvalid.current ? " is-invalid" : ""}`}
                id={`${fieldName}-${fieldType}`}
                {...(fieldType === "email" && { "aria-describedby": "emailHelp" })}
                onChange={(e) => {
                    _ref.current = e.target.value;
                    setValue(_ref.current);
                }}
                value={value}
                {...(fieldType in fieldPatterns && { "pattern": fieldPatterns[fieldType] })}
            />
            <div className="invalid-feedback">
                {`Invalid, ${fieldType in errorMessages ? errorMessages[fieldType] : "Please enter correct data"}`}
            </div>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
    )
}
