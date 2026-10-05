import { Link } from 'react-router-dom';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center gap-1 my-1">
      <div className="flex text-yellow-400 text-sm">
        {[1, 2, 3, 4, 5].map((rate) => (
          <span key={rate}>
            {value >= rate ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : value >= rate - 0.5 ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                 {/* Half star path simplified for demo */}
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" opacity="0.5"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">{text && text}</span>
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.images[0].url} 
          alt={product.name} 
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <Link to={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
        </Link>
        <div className="mt-auto">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <div className="text-lg font-bold text-gray-900 mt-2">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
