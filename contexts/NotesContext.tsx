'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'

interface Note {
  id: number
  title: string
  content: string
}

interface NoteContextType {
  notes: Note[]
  selectedNote: Note | null
  setSelectedNote: (note: Note | null) => void
  addNote: () => void
  deleteNote: (note: Note) => void
  updateNote: (updatedNote: Note) => void
  saveNote: () => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export function NoteProvider({ children }: { children: React.ReactNode }) {
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

  const deleteNote = (note: Note) => {
    const updatedNotes = notes.filter((n) => n.id !== note.id)
    setNotes(updatedNotes)
    setSelectedNote(null)
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
    <NoteContext.Provider value={{ notes, selectedNote, setSelectedNote, addNote, deleteNote, updateNote, saveNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNoteContext() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useNoteContext must be used within a NoteProvider')
  }
  return context
}