import "./index.css";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor = () => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("# Hello!");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditMode(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => removeEventListener("click", listener, { capture: true });
  }, []);

  if (editMode) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(input) => setValue(input || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
