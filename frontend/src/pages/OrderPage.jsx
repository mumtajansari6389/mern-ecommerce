import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const { data: orderData, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
  const order = orderData?.data;

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handlePayment = async () => {
    try {
      await payOrder({ orderId, details: { id: 'TEST_ID', status: 'COMPLETED', update_time: new Date().toISOString(), payer: { email_address: userInfo.data?.email || userInfo.email } } }).unwrap();
      refetch();
      toast.success('Order is paid');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6">Order {order._id}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping</h2>
            <p className="mb-2"><strong>Name: </strong> {order.user.name}</p>
            <p className="mb-4"><strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-blue-600 underline">{order.user.email}</a></p>
            <p className="mb-4">
              <strong>Address: </strong>
              {order.shippingAddress.street}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.orderStatus === 'Delivered' ? (
              <Message variant="success">Delivered on {order.deliveredAt.substring(0, 10)}</Message>
            ) : (
              <Message variant="info">Status: {order.orderStatus}</Message>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Method</h2>
            <p className="mb-4">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Items</h2>
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src={item.image || item.images?.[0]?.url} alt={item.name} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <Link to={`/product/${item.product || item._id}`} className="font-semibold hover:text-blue-600">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-700 font-medium">
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Order Summary</h2>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Items</span>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-b text-lg font-bold">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>

            {!order.isPaid && (
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
                  onClick={handlePayment}
                  disabled={loadingPay}
                >
                  {loadingPay ? 'Processing...' : `Pay ${order.paymentMethod === 'COD' ? 'Now (Simulate)' : 'Now'}`}
                </button>
              </div>
            )}

            {loadingDeliver && <Loader />}
            {userInfo && (userInfo.data?.role === 'admin' || userInfo.role === 'admin') && order.isPaid && order.orderStatus !== 'Delivered' && (
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full bg-gray-900 text-white font-bold py-2 rounded hover:bg-gray-800 transition"
                  onClick={deliverOrderHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
