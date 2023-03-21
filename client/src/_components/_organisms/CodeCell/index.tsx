import { useEffect, useState } from "react";

import CodeEditor from "_components/_molecules/CodeEditor";
import Preview from "_components/_molecules/Preview";
import bundle from "_helpers/bundler";
import Resizable from "_components/_atoms/Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable orientation="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable orientation="horizontal">
          <CodeEditor
            initialValue="const greeting = 'Hello!';"
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
