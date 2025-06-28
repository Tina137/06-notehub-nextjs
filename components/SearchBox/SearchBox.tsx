import css from "./SearchBox.module.css";

interface SearchBoxProps {
  inputValue: string;
  changeInput: (e: string) => void;
}

export default function SearchBox({ inputValue, changeInput }: SearchBoxProps) {
  const handleChange = (e: string) => {
    console.log("sucsses");
    changeInput(e);
  };

  return (
    <input
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
