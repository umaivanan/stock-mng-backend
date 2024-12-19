import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import AdditionalPage1 from './components/AdditionalPage1';
// import AdditionalPage2 from './components/AdditionalPage2';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/additional-page-1" element={<AdditionalPage1 />} />
          {/* <Route path="/additional-page-2" element={<AdditionalPage2 />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
