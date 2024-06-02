import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const token = localStorage.getItem("token") || null;
    const location = useLocation();

    return (
        token !== null ? <Outlet /> : <Navigate to="/please-login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
