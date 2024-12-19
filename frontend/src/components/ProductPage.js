import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    barcodeId: '',
    stock: '',
  });

  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/products', formData);
      setMessage(`Success: ${response.data.message}`);
      setFormData({ name: '', barcodeId: '', stock: '' }); // Clear the form after successful submission
      fetchProducts(); // Refresh the product list
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add product'}`);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products');
      setProducts(response.data.products);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to fetch products'}`);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Add New Product</h1>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Barcode ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barcodeId">
              Barcode ID
            </label>
            <input
              type="text"
              name="barcodeId"
              id="barcodeId"
              value={formData.barcodeId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter barcode ID"
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-center mb-4">Product List</h2>
        {products.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Barcode ID</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.barcodeId}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
