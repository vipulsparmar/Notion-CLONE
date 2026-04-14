const STORAGE_KEY = "notion_like_notes";
const USERNAME = "admin";
const PASSWORD = "1234";

const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const searchInput = document.getElementById("search-input");
const newNoteBtn = document.getElementById("new-note-btn");
const notesList = document.getElementById("notes-list");
const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const deleteNoteBtn = document.getElementById("delete-note-btn");

let notes = [];
let activeNoteId = null;
let searchQuery = "";

function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read notes from localStorage:", error);
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getActiveNote() {
  return notes.find((note) => note.id === activeNoteId) || null;
}

function setEditorEnabled(enabled) {
  noteTitleInput.disabled = !enabled;
  noteContentInput.disabled = !enabled;
  deleteNoteBtn.disabled = !enabled;
}

function setActiveNote(noteId) {
  activeNoteId = noteId;
  const activeNote = getActiveNote();

  if (!activeNote) {
    noteTitleInput.value = "";
    noteContentInput.value = "";
    setEditorEnabled(false);
    return;
  }

  noteTitleInput.value = activeNote.title;
  noteContentInput.value = activeNote.content;
  setEditorEnabled(true);
}

function renderNotes() {
  notesList.innerHTML = "";

  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = searchQuery
      ? "No notes match your search."
      : "No notes yet. Click New Note to start.";
    notesList.appendChild(empty);
    return;
  }

  filtered.forEach((note) => {
    const item = document.createElement("li");
    item.className = `note-item${note.id === activeNoteId ? " active" : ""}`;
    item.dataset.id = note.id;

    const title = document.createElement("p");
    title.className = "note-item-title";
    title.textContent = note.title.trim() || "Untitled";

    const date = document.createElement("p");
    date.className = "note-item-date";
    date.textContent = formatDate(note.createdAt);

    item.appendChild(title);
    item.appendChild(date);
    item.addEventListener("click", () => {
      setActiveNote(note.id);
      renderNotes();
    });

    notesList.appendChild(item);
  });
}

function createNote() {
  const newNote = {
    id: createId(),
    title: "Untitled",
    content: "",
    createdAt: new Date().toISOString(),
  };

  notes.unshift(newNote);
  saveNotes();
  setActiveNote(newNote.id);
  renderNotes();
}

function updateActiveNoteField(field, value) {
  const note = getActiveNote();
  if (!note) return;

  note[field] = value;
  saveNotes();
  renderNotes();
}

function deleteActiveNote() {
  if (!activeNoteId) return;

  notes = notes.filter((note) => note.id !== activeNoteId);
  saveNotes();

  if (notes.length > 0) {
    setActiveNote(notes[0].id);
  } else {
    setActiveNote(null);
  }

  renderNotes();
}

function showApp() {
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  appScreen.setAttribute("aria-hidden", "false");

  notes = loadNotes();
  if (notes.length > 0) {
    setActiveNote(notes[0].id);
  } else {
    setActiveNote(null);
  }
  renderNotes();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (username === USERNAME && password === PASSWORD) {
    loginError.textContent = "";
    showApp();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});

newNoteBtn.addEventListener("click", createNote);

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderNotes();
});

noteTitleInput.addEventListener("input", (event) => {
  updateActiveNoteField("title", event.target.value);
});

noteContentInput.addEventListener("input", (event) => {
  updateActiveNoteField("content", event.target.value);
});

deleteNoteBtn.addEventListener("click", deleteActiveNote);
