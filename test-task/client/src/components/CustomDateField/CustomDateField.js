import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@mui/material";

import { check } from "../../common/utils/helpers/checkIsValid";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "300px",
  },
}));

const CustomDateField = ({
  label,
  type,
  name,
  enteredValue,
  typeCheck,
  onChangeInput,
  disabled,
}) => {
  const classes = useStyles();
  const [isTouched, setIsTouched] = useState(false);
  const checkIsValid = (type, value) =>
    type === "isNotCheck" ? true : check(type, value);

  const hasError = !checkIsValid(typeCheck, enteredValue) && isTouched;

  const valueChangeHandler = (event) => {
    onChangeInput(
      name,
      checkIsValid(typeCheck, event.target.value),
      event.target.value
    );
  };
  useEffect(() => {
    onChangeInput(name, checkIsValid(typeCheck, enteredValue), enteredValue);
  }, []);

  const handleBlur = (event) => {
    setIsTouched(true);
  };

  return (
    <TextField
      size="medium"
      name={name}
      className={classes.textField}
      label={label}
      variant="outlined"
      type={type}
      value={enteredValue}
      onChange={valueChangeHandler}
      onBlur={handleBlur}
      error={hasError}
      disabled={disabled}
    />
  );
};

export default CustomDateField;
