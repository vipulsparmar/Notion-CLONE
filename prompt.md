You are an expert frontend developer.

Build a complete Notion-like notes web app using ONLY:
- HTML
- CSS
- Vanilla JavaScript (no frameworks, no libraries)

The app must be simple, clean, and fully functional.

-------------------------
🔐 LOGIN SYSTEM
-------------------------
- Create a login screen before accessing the app
- Use predefined credentials:
  Username: admin
  Password: 1234
- If login is correct → show the app
- If wrong → show error message
- No backend required

-------------------------
📐 LAYOUT
-------------------------
- Left sidebar (width ~250px)
  - App title (Notes)
  - Search bar
  - "New Note" button
  - List of notes

- Right side:
  - Note editor
  - Title input field
  - Content textarea
  - Delete button

- Clean, minimal UI inspired by Notion
- Soft colors (white, light grey)
- Smooth hover effects

-------------------------
📝 NOTES FEATURES
-------------------------
- Create new note
- Edit note in real-time
- Delete note
- Click note from sidebar to open
- Highlight active note

-------------------------
💾 DATA STORAGE
-------------------------
Use localStorage to store notes in JSON format:

[
  {
    "id": "unique-id",
    "title": "Note title",
    "content": "Note content",
    "createdAt": "timestamp"
  }
]

-------------------------
⚡ FUNCTIONALITY
-------------------------
- Auto-save notes while typing
- Sidebar updates instantly
- Search notes by title
- Maintain currently selected note

-------------------------
✏️ EDITOR
-------------------------
- Use simple input for title
- Use textarea for content
- Live editing (no save button)

-------------------------
🎨 UI DESIGN
-------------------------
- Minimal and aesthetic (Notion-inspired)
- Sidebar with subtle borders
- Hover effects on notes
- Highlight selected note
- Proper spacing and padding

-------------------------
📁 FILE STRUCTURE
-------------------------
Output code in 3 separate files:

1. index.html
2. style.css
3. script.js

-------------------------
📌 CODE QUALITY
-------------------------
- Clean and well-commented code
- Beginner-friendly
- No external libraries
- Fully working on opening index.html

-------------------------
🎯 OUTPUT
-------------------------
Provide complete working code for all 3 files.