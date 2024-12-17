import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import path from 'path';

// Initialize the app
const app = express();

// Load environment variables from the .env file
dotenv.config({ path: path.resolve('config', '.env') });

// MongoDB connection directly within the app file
(async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
})();






// Import routes
import products from './routes/product.js';
import orders from './routes/order.js';

// Middleware for routes

app.use(express.json())
app.use(cors())
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
