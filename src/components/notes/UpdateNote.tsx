/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Modal from "../Modal";
const initialState = {
  title: "",
  content: "",
};

type Status = "idle" | "loading" | "error" | "success";
const UpdateNote = ({ isOpen, onClose, selected }: UpdateNoteProps) => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (selected) {
      setValues({
        title: selected?.title || "",
        content: selected?.content || "",
      });
    }
  }, [selected]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, content } = values;
    if (!title.trim() || !content.trim()) {
      return setError("Title or content cannot be empty");
    }
    setStatus("loading");
    try {
      const res = await fetch(`http://localhost:3001/notes/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add note");
      }
      setStatus("success");
      setValues(initialState);
      setError("");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding note:", error);
      setStatus("error");
      setError("Failed to add note");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Note">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-200 py-2 px-4 text-center rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div className="grid gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter note title"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="note">Note</label>
          <textarea
            id="content"
            name="content"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            placeholder="Write your note here..."
            onChange={handleChange}
            value={values.content}
          ></textarea>
        </div>
        <button
          className="bg-gradient-to-br from-orange-600 to-orange-500 text-white py-2 px-4 rounded-lg shadow-lg hover:from-orange-700 hover:to-orange-600 transition duration-300 h-[52px] w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Updating..." : "Update Note"}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateNote;
interface UpdateNoteProps {
  isOpen: boolean;
  selected: any;
  onClose: () => void;
}
