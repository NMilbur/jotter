import "./index.css";
import MDEditor from "@uiw/react-md-editor";
import { Cell, updateCell } from "_state";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor = ({ cell: { content, id: cellId } }: TextEditorProps) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
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
        <MDEditor
          value={content}
          onChange={(input) => dispatch(updateCell({ id: cellId, content: input || "" }))}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
