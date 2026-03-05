const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // more secure than *
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('student_notes');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// API Routes
(async () => {
  await connectDB();

  // CREATE note
  app.post('/notes', async (req, res) => {
    try {
      const { title, subject, description } = req.body;

      if (!title?.trim() || !description?.trim()) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const safeData = {
        title: title.trim(),
        subject: subject?.trim() || '',
        description: description.trim(),
        created_date: new Date().toISOString().split('T')[0],
      };

      const result = await db.collection('notes').insertOne(safeData);
      res.status(201).json({ 
        message: 'Note created', 
        id: result.insertedId 
      });
    } catch (err) {
      next(err);
    }
  });

  // READ all notes
  app.get('/notes', async (req, res) => {
    try {
      const notes = await db.collection('notes')
        .find()
        .sort({ created_date: -1 })
        .toArray();
      res.json(notes);
    } catch (err) {
      next(err);
    }
  });

  // UPDATE note
  app.put('/notes/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const { title, subject, description } = req.body;

      const updateFields = {};
      if (title?.trim()) updateFields.title = title.trim();
      if (subject !== undefined) updateFields.subject = subject?.trim() || '';
      if (description?.trim()) updateFields.description = description.trim();

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      const result = await db.collection('notes').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.json({ message: 'Note updated' });
    } catch (err) {
      next(err);
    }
  });

  // DELETE note
  app.delete('/notes/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const result = await db.collection('notes').deleteOne({
        _id: new ObjectId(id)
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.json({ message: 'Note deleted' });
    } catch (err) {
      next(err);
    }
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
