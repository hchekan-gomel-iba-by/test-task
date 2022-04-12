import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";

import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";
import CustomDateField from "../../components/CustomDateField";
import styles from "./Form.module.scss";

const Form = ({ formInputs, onSubmit, textError, labelButton }) => {
  const [validData, setValidData] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const [formStateInputs, setFormStateInputs] = useState(
    formInputs.reduce((obj, input) => {
      obj[input.name] = { value: input.value, isValid: false };
      return obj;
    }, {})
  );

  const onChangeInput = (inputName, isValid, value) => {
    setFormStateInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: { value: value, isValid: isValid },
    }));
  };

  useEffect(() => {
    const isValidForm = Object.values(formStateInputs)
      .map((input) => input.isValid)
      .reduce((isValid, nextIsValid) => {
        return isValid && nextIsValid;
      }, true);

    setFormIsValid(isValidForm);
  }, [formStateInputs]);

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(formIsValid, formStateInputs, setValidData);
  };

  return (
    <div className={styles.form}>
      <Stack direction="column" spacing={3} alignItems="center">
        {!validData && <p>{textError}</p>}
        {formInputs.map((input, item) => (
          <div key={item}>
            {input.type !== "date" ? (
              <CustomTextField
                label={input.label}
                type={input.type}
                name={input.name}
                enteredValue={formStateInputs[input.name].value}
                typeCheck={input.check}
                onChangeInput={onChangeInput}
              />
            ) : (
              <CustomDateField
                label={input.label}
                type={input.type}
                name={input.name}
                enteredValue={formStateInputs[input.name].value}
                typeCheck={input.check}
                onChangeInput={onChangeInput}
              />
            )}
          </div>
        ))}
        <CustomButton
          label={labelButton}
          onClick={submitHandler}
          disabled={!formIsValid}
        />
      </Stack>
    </div>
  );
};

export default Form;
