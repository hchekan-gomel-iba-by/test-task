import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mdButton: {
    margin: '10px',
    backgroundColor: '#0047ab',
    color: '#f2f0fc'
  },
}));

const CustomButton = ({ label, onClick, disabled }) => {
  const classes = useStyles();

  return (
    <Button 
           className={classes.mdButton}
           variant="contained"
           onClick={onClick}
           disabled={disabled}
    >
      {label}
    </Button>
  );
};

CustomButton.propsTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

CustomButton.defaultProps = {
  label: 'button',
  onClick: () => {},
  disabled: false
};

export default CustomButton;
