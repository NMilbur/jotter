import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "_state";
import CellList from "_components/_pages/CellList";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);
