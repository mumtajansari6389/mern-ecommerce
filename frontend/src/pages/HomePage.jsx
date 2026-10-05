import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  const { keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: 1,
  });

  return (
    <>
      {!keyword ? (
        <div className="bg-blue-600 text-white rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Latest Tech Gadgets</h1>
            <p className="text-blue-100 mb-6">Discover the best electronics with unbeatable prices.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
          <div className="mt-6 md:mt-0 max-w-xs hidden md:block">
            {/* Can add a hero image here later */}
          </div>
        </div>
      ) : (
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Go Back
        </Link>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {keyword ? 'Search Results' : 'Latest Products'}
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {data.data.products.length === 0 && <Message>No products found</Message>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
