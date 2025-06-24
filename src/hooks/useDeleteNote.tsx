// import { useState } from "react";
import { AxiosInstance } from "../libs/axiosInstance";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteNote = () => {
  // const [status, setStatus] = useState<Status>("idle");
  // const [error, setError] = useState<string>("");

  // const deleteNote = async (id: number | string) => {
  //   setStatus("loading");
  //   try {
  //     await AxiosInstance.delete(`/notes/${id}`);
  //     toast.success("Note deleted successfully");
  //     setStatus("success");
  //     setError("");
  //   } catch (error) {
  //     console.error(error);
  //     setError((error as Error).message);
  //     setStatus("error");
  //   }
  // };

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number | string) => {
      if (!id) return;
      const { data } = await AxiosInstance.delete(`/notes/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Note deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete note: ${error.message}`);
    },
  });

  return {
    deleteNote: mutate,
    isPending,
  };
};

export default useDeleteNote;
