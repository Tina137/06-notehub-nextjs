import { Note } from "@/types/note";
import { deleteList } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import Link from "next/link";

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => await deleteList(id),
    onSuccess: () => {
      console.log("Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  return (
    <ul className={css.list}>
      {notes.length > 0 &&
        notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <Link href={`notes/${String(note.id)}`}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button onClick={() => mutate(note.id)} className={css.button}>
                  Delete
                </button>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NoteList;
