"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Save } from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
}

export default function NotetakeApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: `New Note ${notes.length + 1}`,
      content: ""
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    setSelectedNote(newNote)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    setNotes(updatedNotes)
    setSelectedNote(updatedNote)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const saveNote = () => {
    if (selectedNote) {
      const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]")
      const updatedSavedNotes = [...savedNotes, selectedNote]
      localStorage.setItem("savedNotes", JSON.stringify(updatedSavedNotes))
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-serif font-semibold text-gray-800">Notes</h2>
          <button onClick={addNote} className="text-blue-500 hover:text-blue-600">
            <PlusCircle size={24} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-128px)]">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 cursor-pointer ${selectedNote?.id === note.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
              onClick={() => setSelectedNote(note)}
            >
              <h3 className="font-serif font-medium text-gray-800 truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 truncate">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="flex justify-between items-center p-4 bg-white shadow-sm">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
                className="text-2xl font-serif font-semibold bg-transparent border-none outline-none"
                placeholder="Note title"
              />
              <button onClick={saveNote} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
                <Save size={18} className="mr-2" />
                Save Note
              </button>
            </div>
            <textarea
              value={selectedNote.content}
              onChange={(e) => updateNote({ ...selectedNote, content: e.target.value })}
              className="flex-1 p-4 text-lg bg-transparent border-none outline-none resize-none font-sans"
              placeholder="Start typing your note here..."
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-serif">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
}
