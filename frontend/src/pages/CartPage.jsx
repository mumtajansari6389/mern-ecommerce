import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/" className="text-blue-600 underline">Go Back</Link>
          </Message>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4 gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.images[0]?.url} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="text-lg font-semibold hover:text-blue-600">
                    {item.name}
                  </Link>
                  <div className="text-gray-500 font-bold">${item.price}</div>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="md:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <div className="text-2xl font-bold mb-6">
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
