import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";

import CodeCell from "_components/_organisms/CodeCell";
import TextEditor from "_components/_molecules/TextEditor";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

root.render(<App />);
