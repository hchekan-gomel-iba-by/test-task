import React, { useEffect, useState} from 'react';

import styles from './WithLoadingDelay.module.scss';

const withLoadingDelay = (WrappedComponent) => {

  return function WithLoader(props){
    const [load, setLoad] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoad(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);
    return load ? <div className={styles.loader}/> : <WrappedComponent {...props}/>;
  };
};

export default withLoadingDelay;
