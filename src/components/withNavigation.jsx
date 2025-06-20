// src/utils/withNavigation.js
import { useNavigate } from 'react-router-dom';

export const withNavigation = (Component) => {
  return function WithNavigation(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};
