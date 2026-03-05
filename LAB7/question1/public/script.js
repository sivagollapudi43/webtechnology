const API = "http://localhost:3000/notes";

async function addNote() {
  const title = document.getElementById("title").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Title and Description are required!");
    return;
  }

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subject, description })
    });

    document.getElementById("title").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("description").value = "";

    loadNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to add note");
  }
}

async function loadNotes() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to load notes");
    
    const data = await res.json();

    let html = "";
    data.forEach(n => {
      html += `
        <div>
          <h4>${n.title}</h4>
          ${n.subject ? `<p><strong>Subject:</strong> ${n.subject}</p>` : ''}
          <p>${n.description}</p>
          <p><small>Created: ${n.created_date}</small></p>
          <button onclick="deleteNote('${n._id}')">Delete</button>
        </div>
      `;
    });

    document.getElementById("notes").innerHTML = html || "<p>No notes yet.</p>";
  } catch (err) {
    console.error(err);
    document.getElementById("notes").innerHTML = "<p>Error loading notes.</p>";
  }
}

async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;

  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete note");
  }
}

// Load notes when page opens
loadNotes();