// import { useEffect, useState } from "react";
// import type { Note } from "../constant/notes";
import { AxiosInstance } from "../libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
// type Status = "idle" | "loading" | "error" | "success";
const useGetNotes = () => {
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [status, setStatus] = useState<Status>("idle");
  // const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     setStatus("loading");
  //     try {
  //       const { data } = await AxiosInstance("notes");
  //       setNotes(data || []);
  //       setStatus("success");
  //       setError("");
  //     } catch (error) {
  //       console.log(error);
  //       setError((error as Error).message);
  //       setStatus("error");
  //     }
  //   };

  //   fetchNotes();
  // }, []);

  const query = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await AxiosInstance("notes");
      return data;
    },
  });
  return {
    notes: query.data || [],
    status: query.status,
    error: query.error,
  };
};

export default useGetNotes;
