"use client";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "@/app/notes/page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const Notes = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebounce(inputValue, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedInput],
    queryFn: async () => await fetchNotes(page, debouncedInput),
    placeholderData: keepPreviousData,
  });
  const onPageChange = (selected: number) => {
    setPage(selected + 1);
  };
  const changeInput = (e: string) => {
    setPage(1);
    setInputValue(e);
  };
  if (data) {
    console.log(data);
  }
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox inputValue={inputValue} changeInput={changeInput} />
          {data && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={onPageChange}
            />
          )}
        </header>
        {data && <NoteList notesArr={data.notes} />}
      </div>
    </>
  );
};

export default Notes;
