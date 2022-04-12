import React, { useEffect, useState} from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';

const withLoadingDelay = (WrappedComponent) => {

  return function WithLoader(props){
    const [load, setLoad] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoad(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);
    return load ? <LoadingSpinner /> : <WrappedComponent {...props}/>;
  };
};

export default withLoadingDelay;
