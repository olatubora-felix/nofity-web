import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";
import type { Note } from "../../constant/notes";
import { useEffect, useState } from "react";
type Status = "idle" | "loading" | "error" | "success";
const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNotes = async () => {
      setStatus("loading");
      try {
        const res = await fetch("http://localhost:3001/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await res.json();
        setNotes(data);
        setStatus("success");
        setError("");
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
        setStatus("error");
      }
    };

    fetchNotes();
  }, []);
  console.log(error, "error");
  console.log(status, "status");
  return (
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
      </div>
    </section>
  );
};

export default NotesList;
