import React, { useRef, useState } from "react";

import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim().length === 0;

const CheckoutForm = (props) => {
  const [inputsValidity, setInputsValidity] = useState({
    name: true,
    address: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const addressIsValid = !isEmpty(enteredAddress);

    setInputsValidity({
      name: nameIsValid,
      address: addressIsValid,
    });

    const formIsValid = nameIsValid && addressIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
        name: enteredName,
        address: enteredAddress,
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          inputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Enter name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputsValidity.name && <p>Enter correct name</p>}
      </div>
      <div className={`${classes.control} ${
          inputsValidity.address ? "" : classes.invalid
        }`}>
        <label htmlFor="address">Enter address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!inputsValidity.address && <p>Enter valid address</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
