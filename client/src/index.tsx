import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";

import CodeCell from "_components/_organisms/CodeCell";
import TextEditor from "_components/_molecules/TextEditor";
import { Provider } from "react-redux";
import { store } from "_state";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

root.render(<App />);
