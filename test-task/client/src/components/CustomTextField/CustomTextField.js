import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { check } from "../../common/utils/helpers/checkIsValid";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "300px",
  },
}));

const CustomTextField = ({
  label,
  type,
  name,
  enteredValue,
  typeCheck,
  onChangeInput,
  disabled,
}) => {
  const classes = useStyles();

  const [visible, setVisibility] = useState(type === "password" ? false : true);
  const [isTouched, setIsTouched] = useState(false);
  const isValid = check(typeCheck, enteredValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    onChangeInput(
      name,
      check(typeCheck, event.target.value),
      event.target.value
    );
  };

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
      type={!visible ? type : "text"}
      value={enteredValue}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisibility(!visible)}
              edge="end"
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={valueChangeHandler}
      onBlur={handleBlur}
      error={hasError}
      disabled={disabled}
    />
  );
};

export default CustomTextField;
