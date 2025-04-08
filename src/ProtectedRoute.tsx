import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;