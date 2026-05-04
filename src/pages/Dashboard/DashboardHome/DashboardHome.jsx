import useRole from '../../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const { role } = useRole()

    return (
        <div>
            {role === 'admin' && <AdminDashboardHome></AdminDashboardHome>}
            {role === 'rider' && <RiderDashboardHome></RiderDashboardHome>}
            {role === 'user' && <UserDashboardHome></UserDashboardHome>}
        </div>
    );
};

export default DashboardHome;