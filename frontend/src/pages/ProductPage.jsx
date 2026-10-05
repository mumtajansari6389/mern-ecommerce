import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: productData, isLoading, error } = useGetProductDetailsQuery(productId);
  const product = productData?.data;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      <Link className="text-gray-600 hover:text-blue-600 mb-6 inline-block" to="/">
        &larr; Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img 
              src={product.images[0].url} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="md:w-1/3 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="text-gray-500 pb-4 border-b">Brand: {product.brand}</div>
            <div className="text-2xl font-bold text-gray-900">${product.price}</div>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold">${product.price}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Status:</span>
                <span className="font-bold">
                  {product.countInStock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out Of Stock</span>
                  )}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex justify-between py-2 border-b items-center">
                  <span className="text-gray-600">Qty:</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className="w-full bg-black text-white py-3 rounded mt-4 font-bold hover:bg-gray-800 disabled:bg-gray-400 transition"
                type="button"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
