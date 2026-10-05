import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery();
  const orders = ordersData?.data || [];

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.data?.name || userInfo.name);
      setEmail(userInfo.data?.email || userInfo.email);
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-6">
      <div className="md:w-1/3">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </form>
        </div>
      </div>
      
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 border-b">ID</th>
                    <th className="p-4 border-b">DATE</th>
                    <th className="p-4 border-b">TOTAL</th>
                    <th className="p-4 border-b">PAID</th>
                    <th className="p-4 border-b">STATUS</th>
                    <th className="p-4 border-b"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 border-b last:border-0">
                      <td className="p-4 text-gray-500">{order._id.substring(0, 10)}...</td>
                      <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                      <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-4">
                        {order.isPaid ? (
                          <span className="text-green-600">{order.paidAt.substring(0, 10)}</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.orderStatus === 'Delivered' ? (
                          <span className="text-green-600">{order.deliveredAt.substring(0, 10)}</span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded text-xs">{order.orderStatus}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded text-xs transition">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
