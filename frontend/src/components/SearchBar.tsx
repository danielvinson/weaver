import { useState } from "react";
import type { CSSProperties} from "react";

const styles: Record<string, CSSProperties> = {
  input: {},
};

export const SearchBar = () => {
  const [inputText, setInputText] = useState<string>("");
  const [option, setOption] = useState<string>("");

  return (
    <div>
      <input type="text" style={styles.input} />
      <select>
        <option value={"1"}>Val 1</option>
        <option value={"2"}>Val 2</option>
      </select>

    </div>
  );
};
