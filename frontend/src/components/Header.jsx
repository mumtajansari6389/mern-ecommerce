import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Package, Settings, Search } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
          TechShop.
        </Link>

        <form onSubmit={submitHandler} className="hidden md:flex flex-1 max-w-lg mx-8 relative">
          <input
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-500">
            <Search size={20} />
          </button>
        </form>

        <nav className="flex items-center gap-6">
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 flex items-center gap-1">
            <ShoppingCart size={22} />
            <span className="hidden sm:block">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium"
              >
                <User size={22} />
                <span className="hidden sm:block">{userInfo.data?.name || userInfo.name}</span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium">
              <User size={22} />
              <span className="hidden sm:block">Sign In</span>
            </Link>
          )}

          {userInfo && (userInfo.data?.role === 'admin' || userInfo.role === 'admin') && (
            <div className="relative">
              <button 
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium"
              >
                <Settings size={22} />
                <span className="hidden sm:block">Admin</span>
              </button>
              
              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1">
                  <Link to="/admin/products" onClick={() => setAdminDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <Package size={16} /> Products
                  </Link>
                  <Link to="/admin/orders" onClick={() => setAdminDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <ShoppingCart size={16} /> Orders
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
