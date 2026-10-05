import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.street) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between mb-8 text-sm font-medium">
        <span className="text-gray-400">Shipping</span>
        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Payment</span>
        <span className="text-gray-400">Place Order</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-4">Select Method</label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-medium">PayPal or Credit Card</span>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-medium">Cash On Delivery</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
