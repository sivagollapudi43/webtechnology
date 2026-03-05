const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: '*' }));           // Change to specific origin in production
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(MONGO_URL);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('book_finder');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────

(async () => {
  await connectDB();
  const books = db.collection('books');

  // 1. Search Books by Title (case-insensitive partial match)
  app.get('/books/search', async (req, res) => {
    try {
      const { title } = req.query;
      if (!title) {
        return res.status(400).json({ error: 'title query parameter is required' });
      }

      const query = { title: { $regex: title, $options: 'i' } };
      const results = await books.find(query).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Filter Books by Category
  app.get('/books/category/:cat', async (req, res) => {
    try {
      const category = req.params.cat;
      const results = await books.find({ category }).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 3. Sort Books (by price or rating)
  // Examples:
  //   /books/sort?by=price&order=asc
  //   /books/sort?by=rating&order=desc
  app.get('/books/sort', async (req, res) => {
    try {
      const { by, order = 'asc' } = req.query;
      if (!by || !['price', 'rating'].includes(by)) {
        return res.status(400).json({ error: 'Invalid sort field. Use price or rating' });
      }

      const sortField = {};
      sortField[by] = order.toLowerCase() === 'desc' ? -1 : 1;

      const results = await books.find().sort(sortField).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4. Top Rated Books (rating >= 4.0, top 5)
  app.get('/books/top', async (req, res) => {
    try {
      const results = await books
        .find({ rating: { $gte: 4 } })
        .sort({ rating: -1 })
        .limit(5)
        .toArray();

      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 5. Pagination (all books with page & limit)
  // Example: /books?page=2&limit=8
  app.get('/books', async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;

      if (page < 1) page = 1;
      if (limit < 1) limit = 10;
      if (limit > 50) limit = 50; // safety limit

      const skip = (page - 1) * limit;

      const results = await books
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

      const total = await books.countDocuments();

      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: results
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
    console.log('Open in browser: http://localhost:3000');
  });
})();
