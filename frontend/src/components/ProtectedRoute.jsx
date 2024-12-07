import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
}
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
