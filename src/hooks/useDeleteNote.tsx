import { useState } from "react";

const useDeleteNote = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const deleteNote = async (id: number | string) => {
    setStatus("loading");
    try {
      const res = await fetch(`http://localhost:3001/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete note");
      }

      setStatus("success");
      setError("");
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
      setStatus("error");
    }
  };

  return { deleteNote, status, error };
};

export default useDeleteNote;
type Status = "idle" | "loading" | "error" | "success";
