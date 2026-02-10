/* eslint-disable react/prop-types */

import { useState } from 'react'
import Field from './Field'

export default function Form({maxID, userPost, userPut, mode, setMode, fieldsRefs, fieldToRender}) {
    const [isValidated, setIsValidated] = useState(false) 
    const {phoneNumber, email, id} = fieldsRefs;
    // const fieldToRender = [id, fname, lname, phoneNumber, email, address]

    function validateForm(){
        if (phoneNumber.ref.current.length !== 10 && !phoneNumber.ref.current.match("/^\\d{10}/gm") ){
            console.log("Phone Number issue");
            phoneNumber.isInvalid.current = true;
            return false;}
        
        if (!email.ref.current.match("^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$")){
            console.log("email issue");
            email.isInvalid.current = true;
            return false;}
        return true;
    }
    function clearAllFields() {
        // eslint-disable-next-line no-unused-vars
        Object.entries(fieldsRefs).forEach((field) =>  field[1].ref.current = "");
        setIsValidated(false);
    }
    function handleSubmit(e) {
        if (e.currentTarget.checkValidity()){
            e.preventDefault();
            e.stopPropagation();
        }
        if (!validateForm()) {
            alert("Some fields are invalid");
            setIsValidated(true);
            return;
        }
        const formData = {}
        fieldToRender.forEach((field) => {
            if (field.codeName === "id"){
                formData[field.codeName] = String(maxID.current + 1);
                return;
            }
            formData[field.codeName] = field.ref.current;
        })
        if (mode === "Add") userPost(formData);
        if (mode === "Update") {
            formData["id"] = String(id.ref.current);
            userPut(id.ref.current,formData);
        }
        clearAllFields();
        setMode("Add");
    }

    return (
        <form className= {`w-[70%] ${isValidated ? "was-validated" : ""}`}>
            {fieldToRender.map((field, idx) => {
                if (field.fieldName === "Id") return
                return <Field key={idx} fieldName={field.fieldName} fieldType={field.fieldType} _ref={field.ref} isRequired={true} isInvalid={field.isInvalid}/>
            })}
            <div className="col-12">
                <button className="btn btn-primary" onClick={handleSubmit} type="submit">{`${mode} User`}</button>
            </div>
        </form>
    )
}
