import Loading from "../components/shared/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoute = ({children}) => {
   const { user, loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'rider') {
        return <h1 className='min-h-screen text-black text-7xl'>Forbidden Access</h1>
    }

    return children
};

export default RiderRoute;