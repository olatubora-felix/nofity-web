// import { useState } from "react";
import AddNote from "./components/notes/AddNote";
import NotesList from "./components/notes/NotesList";

const App = () => {
  return (
    <main className="bg-gray-300  min-h-screen">
      <div className="flex justify-center items-center py-4">
        <h2 className="text-black font-semibold text-2xl">
          Welcome to Notify App
        </h2>
      </div>
      <div className="container mx-auto p-4">
        <AddNote />
        <NotesList />
      </div>
    </main>
  );
};

export default App;
