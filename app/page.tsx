"use client"

import { useNoteContext } from "@/contexts/NotesContext"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotetakeApp() {
  const { selectedNote, updateNote, saveNote } = useNoteContext()

  return (
    <div className="">
      {selectedNote ? (
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4">
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
              className="text-2xl font-semibold bg-transparent border-none outline-none"
              placeholder="Note title"
            />
            <Button onClick={saveNote}>Save Note</Button>
            {/* <button onClick={saveNote} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <Save size={18} className="mr-2" />
              Save Note
            </button> */}
          </div>
          <textarea
            value={selectedNote.content}
            onChange={(e) => updateNote({ ...selectedNote, content: e.target.value })}
            className="flex-1 p-4 text-lg bg-transparent border-none outline-none resize-none"
            placeholder="Start typing your note here..."
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a note or create a new one
        </div>
      )}
    </div>
  )
}

//  <div className="flex h-[calc(100vh-64px)] bg-gray-100">
//    {/* Sidebar */}
//    <div className="w-64 bg-white border-r border-gray-200">
//      <div className="flex items-center justify-between p-4 border-b border-gray-200">
//        <h2 className="text-xl font-serif font-semibold text-gray-800">Notes</h2>
//       <button onClick={addNote} className="text-blue-500 hover:text-blue-600">
//         <PlusCircle size={24} />
//        </button>
//      </div>
//      <div className="overflow-y-auto h-[calc(100vh-128px)]">
//        {notes.map((note) => (
//         <div
//           key={note.id}
//           className={`p-4 cursor-pointer ${selectedNote?.id === note.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
//           onClick={() => setSelectedNote(note)}
//         >
//           <h3 className="font-serif font-medium text-gray-800 truncate">{note.title}</h3>
//           <p className="text-sm text-gray-500 truncate">{note.content}</p>
//         </div>
//       ))}
//     </div>
//   </div>