import { useEffect, useState } from "react";
import type { Note } from "../constant/notes";
type Status = "idle" | "loading" | "error" | "success";
const useGetNotes = () => {
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
  return {
    notes,
    status,
    error,
  };
};

export default useGetNotes;
