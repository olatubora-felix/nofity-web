import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";
import type { Note } from "../../constant/notes";
import { useState } from "react";
import useDeleteNote from "../../hooks/useDeleteNote";
import UpdateNote from "./UpdateNote";
import useGetNotes from "../../hooks/useGetNotes";

const NotesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Note | null>(null);
  const { deleteNote, status: deleteStatus } = useDeleteNote();
  const { notes, status, error } = useGetNotes();

  const handleEdit = (note: Note) => {
    setSelected(note);
    setIsOpen(true);
  };
  return (
    <>
      <section>
        {status === "loading" && (
          <div className="flex justify-center items-center py-4">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        )}
        {status === "error" && (
          <div className="flex justify-center items-center py-4 bg-white shadow-md rounded-md my-4 max-w-xl mx-auto">
            <p className="text-red-500 text-xl font-bold">{error}</p>
          </div>
        )}
        <div className="py-10 grid md:grid-cols-2 md:gap-6">
          {notes.length > 0 &&
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white shadow-sm rounded-md p-4 mb-4 shadow-orange-500"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                  <div className="flex items-center gap-2">
                    {deleteStatus === "loading" ? (
                      <span>Loading...</span>
                    ) : (
                      <Trash2
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteNote(note.id)}
                      />
                    )}

                    <Edit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(note)}
                    />
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{note.content}</p>
                <div className="flex  items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    {dayjs(note.createdAt).format("MMMM D, YYYY")}
                  </span>
                  {note.updatedAt && (
                    <span className="text-gray-500 text-sm">
                      {dayjs(note.updatedAt).format("MMMM D, YYYY")}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
      <UpdateNote
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={selected}
      />
    </>
  );
};

export default NotesList;
