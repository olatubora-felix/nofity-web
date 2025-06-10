import { useState } from "react";
import Modal from "../Modal";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  title: "",
  content: "",
};

type Status = "idle" | "loading" | "error" | "success";
const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

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

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, content } = values;
    if (!title.trim() || !content.trim()) {
      return setError("Title or content cannot be empty");
    }
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add note");
      }
      setStatus("success");
      setValues(initialState);
      setError("");
      setIsOpen(false);
      window.location.reload();
      // handleNote(data); // Assuming handleNote is passed as a prop
    } catch (error) {
      console.error("Error adding note:", error);
      setStatus("error");
      setError("Failed to add note");
    }

    // handleNote({
    //   title,
    //   content,
    //   id: uuidv4(),
    //   createdAt: new Date().toISOString(),
    // });
  };
  return (
    <>
      <div className="justify-center items-center flex ">
        <button
          className="bg-gradient-to-br from-orange-600 to-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-orange-700 hover:to-orange-600 transition duration-300"
          onClick={toggleModal}
        >
          Add New Note
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal} title="Add New Note">
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
            {status === "loading" ? "Adding..." : "Add Note"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddNote;
