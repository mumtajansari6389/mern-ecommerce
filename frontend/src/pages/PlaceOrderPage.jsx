import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.street) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.street, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.images?.[0]?.url || '',
          price: item.price,
          qty: item.qty
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex justify-between mb-8 text-sm font-medium w-full max-w-md mx-auto px-4">
        <span className="text-gray-400">Shipping</span>
        <span className="text-gray-400">Payment</span>
        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Place Order</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.street}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img src={item.images[0]?.url} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${item.product}`} className="font-semibold hover:text-blue-600">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-700 font-medium">
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Order Summary</h2>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between py-2 border-b text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="flex justify-between py-3 border-b text-lg font-bold">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
            
            {error && <div className="mt-4"><Message variant="danger">{error?.data?.message || 'Error creating order'}</Message></div>}

            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition mt-6 disabled:bg-gray-400"
              disabled={cart.cartItems === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
