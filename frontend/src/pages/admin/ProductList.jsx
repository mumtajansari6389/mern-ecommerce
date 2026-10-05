import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber: 1 });
  const products = data?.data?.products || [];

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new sample product?')) {
      try {
        await createProduct().unwrap();
        toast.success('Product created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
          onClick={createProductHandler}
          disabled={loadingCreate}
        >
          <span className="text-xl">+</span> Create Product
        </button>
      </div>

      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      
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
                  <th className="p-4 border-b">NAME</th>
                  <th className="p-4 border-b">PRICE</th>
                  <th className="p-4 border-b">CATEGORY</th>
                  <th className="p-4 border-b">BRAND</th>
                  <th className="p-4 border-b"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 border-b last:border-0">
                    <td className="p-4 text-gray-500">{product._id.substring(0, 10)}...</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.brand}</td>
                    <td className="p-4 text-right">
                      {/* Would usually have edit link here */}
                      <button
                        className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-1 px-3 rounded text-xs transition"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
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

export default ProductList;
