import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const OrderList = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const orders = ordersData?.data || [];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
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
                  <th className="p-4 border-b">USER</th>
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
                    <td className="p-4 font-medium">{order.user && order.user.name}</td>
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
                        <span className="text-green-600 font-medium">Delivered</span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded text-xs">{order.orderStatus}</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
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
    </>
  );
};

export default OrderList;
