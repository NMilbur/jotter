import { useState } from "react";

import CodeEditor from "_components/_molecules/CodeEditor";
import Preview from "_components/_molecules/Preview";
import bundle from "_helpers/bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue="const greeting = 'Hello!';" onChange={(value) => setInput(value)} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
