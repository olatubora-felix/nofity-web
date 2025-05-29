export const notesList: Note[] = [
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

export interface Note {
  id: number | string;
  title: string;
  content: string;
  createdAt: string;
}
