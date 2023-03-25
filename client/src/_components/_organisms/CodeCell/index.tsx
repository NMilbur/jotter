import { useEffect, useState } from "react";

import CodeEditor from "_components/_molecules/CodeEditor";
import Preview from "_components/_molecules/Preview";
import bundle from "_helpers/bundler";
import Resizable from "_components/_atoms/Resizable";
import { Cell, updateCell } from "_state";
import { useDispatch } from "react-redux";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell: { content, id: cellId } }: CodeCellProps) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(content);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <Resizable orientation="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable orientation="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => dispatch(updateCell({ id: cellId, content: value }))}
          />
        </Resizable>

        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
