import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  const isAdmin = userInfo && (userInfo.data?.role === 'admin' || userInfo.role === 'admin');
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
