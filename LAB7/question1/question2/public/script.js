const API_BASE = 'http://localhost:3000';

function displayBooks(books) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (books.length === 0) {
    container.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p><strong>Rating:</strong> ${book.rating} / 5</p>
      <p><small>Published: ${book.year}</small></p>
    `;
    container.appendChild(div);
  });
}

async function searchByTitle() {
  const title = document.getElementById('searchTitle').value.trim();
  if (!title) return alert('Enter a title');

  const res = await fetch(`${API_BASE}/books/search?title=${encodeURIComponent(title)}`);
  const data = await res.json();
  displayBooks(data);
}

async function filterByCategory() {
  const cat = document.getElementById('category').value;
  if (!cat) return alert('Select a category');

  const res = await fetch(`${API_BASE}/books/category/${encodeURIComponent(cat)}`);
  const data = await res.json();
  displayBooks(data);
}

async function sortBooks() {
  const val = document.getElementById('sortBy').value;
  const [by, dir] = val.split('-');

  const res = await fetch(`${API_BASE}/books/sort?by=${by}&order=${dir}`);
  const data = await res.json();
  displayBooks(data);
}

async function showTopRated() {
  const res = await fetch(`${API_BASE}/books/top`);
  const data = await res.json();
  displayBooks(data);
}

// Optional: load some books on page load
window.onload = async () => {
  const res = await fetch(`${API_BASE}/books?page=1&limit=10`);
  const { data } = await res.json();
  displayBooks(data);
};