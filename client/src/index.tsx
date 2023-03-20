import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";

import CodeCell from "_components/_organisms/CodeCell";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

root.render(<App />);
