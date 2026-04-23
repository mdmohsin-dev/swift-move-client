import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <div className="min-h-screen"><h1 className="text-7xl text-black">Loading...</h1></div>
    }

    if (!user) {
        return <Navigate state={{ from: location }} to="/login"></Navigate>
    }

    return children
};

export default PrivetRoute;