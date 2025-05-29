import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";
import type { Note } from "../../constant/notes";

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <section className="py-10 grid md:grid-cols-2 md:gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow-sm rounded-md p-4 mb-4 shadow-orange-500"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <div className="flex items-center gap-2">
              <Trash2 className="text-red-500 cursor-pointer" />
              <Edit className="text-blue-500 cursor-pointer" />
            </div>
          </div>
          <p className="text-gray-700 mb-2">{note.content}</p>
          <span className="text-gray-500 text-sm">
            {dayjs(note.createdAt).format("MMMM D, YYYY")}
          </span>
        </div>
      ))}
    </section>
  );
};

export default NotesList;
interface NotesListProps {
  notes: Note[];
}
