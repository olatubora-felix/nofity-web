import dayjs from "dayjs";

const NotesList = () => {
  return (
    <section className="py-10 grid md:grid-cols-2 md:gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow-sm rounded-md p-4 mb-4 shadow-orange-500"
        >
          <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
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
const notes = [
  {
    id: 1,
    title: "Note 1",
    content: "This is the content of note 1",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Note 2",
    content: "This is the content of note 2",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Note 3",
    content: "This is the content of note 3",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Note 4",
    content: "This is the content of note 4",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Note 5",
    content: "This is the content of note 5",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Note 6",
    content: "This is the content of note 6",
    createdAt: new Date().toISOString(),
  },
];
