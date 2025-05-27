import NotesList from "./components/notes/notesList";

const App = () => {
  return (
    <main className="bg-gray-300 ">
      <div className="flex justify-center items-center py-4">
        <h2 className="text-black font-semibold text-2xl">
          Welcome to Notify App
        </h2>
      </div>
      <div className="container mx-auto p-4">
        <div className="justify-center items-center flex ">
          <button className="bg-gradient-to-br from-orange-600 to-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-orange-700 hover:to-orange-600 transition duration-300">
            Add New Note
          </button>
        </div>
        <NotesList />
      </div>
    </main>
  );
};

export default App;
