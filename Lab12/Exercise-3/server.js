const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// ==========================================
// 1. DATABASE CONNECTION
// ==========================================
// Replace the URI with your MongoDB Atlas connection string if not using a local database.
const mongoURI = 'mongodb://127.0.0.1:27017/inventory_db';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Successfully connected to MongoDB.'))
    .catch((err) => console.error('❌ Database connection error:', err));


// ==========================================
// 2. SCHEMA DEFINITION & MODEL CREATION
// ==========================================
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    inStock: { 
        type: Boolean, 
        default: true 
    }
});

// Compile the schema into a model
const Product = mongoose.model('Product', productSchema);


// ==========================================
// 3. API ROUTES (CRUD OPERATIONS)
// ==========================================

// CREATE: Insert data using .save()
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, inStock } = req.body;
        
        // Create a new instance of the Product model
        const newProduct = new Product({ name, price, inStock });
        
        // Save to the database asynchronously
        const savedProduct = await newProduct.save();
        
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error: error.message });
    }
});

// READ: Retrieve all data using .find()
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
});

// READ: Retrieve a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID or server error", error: error.message });
    }
});

// UPDATE: Update a record using .findByIdAndUpdate()
app.put('/api/products/:id', async (req, res) => {
    try {
        // The { new: true } option ensures we get the updated document back in the response
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error: error.message });
    }
});

// DELETE: Remove a record using .findByIdAndDelete()
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});


// ==========================================
// 4. SERVER INITIALIZATION
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});