import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search bar input
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.barcodeId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle sell button click
  const handleSell = async (productId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/products/${productId}/sell`);
      const updatedProduct = response.data.product;

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? updatedProduct : product))
      );
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.map((product) => (product._id === productId ? updatedProduct : product))
      );
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by Barcode ID"
        className="mb-6 p-2 border border-gray-300 rounded w-3/4 sm:w-1/2 lg:w-1/3"
      />

      {loading && <p className="text-xl text-gray-600">Loading...</p>}
      {error && <p className="text-xl text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded p-4 flex flex-col items-center"
            >
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700">Barcode ID: {product.barcodeId}</p>
              <p className="text-gray-700">Stock: {product.stock}</p>
              <p
                className={`text-sm font-bold mt-2 ${product.stockOut ? 'text-red-500' : 'text-green-500'}`}
              >
                {product.stockOut ? 'Out of Stock' : 'In Stock'}
              </p>
              <button
                onClick={() => handleSell(product._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={product.stockOut}
              >
                Sell
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
