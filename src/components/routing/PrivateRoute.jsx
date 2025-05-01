// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ component: Component, roles = [], ...rest }) => {
//   const { user } = useSelector((state) => state.auth);
//   console.log("user", user, roles, )

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (roles.length > 0 && !roles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return <Component />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;