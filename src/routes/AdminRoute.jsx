import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/shared/Loading';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <h1 className='min-h-screen text-black text-7xl'>Forbidden Access</h1>
    }

    return children
};

export default AdminRoute;