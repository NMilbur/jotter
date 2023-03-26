import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = [
      `
        import _React from "react";
        import _ReactDOM from "react-dom";

        var show = (value) => {
          const root = document.querySelector("#root");

          if (typeof value === "object") {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
              return;
            }
            
            value = JSON.stringify(value);
          }

          root.innerHTML = value;
        }
      `,
    ];

    const showFuncNoop = "var show = () => {}";

    const cumulative = [];

    for (const { type, content, id } of orderedCells) {
      if (type === "code") {
        if (id === cellId) cumulative.push(showFunc);
        else cumulative.push(showFuncNoop);

        cumulative.push(content);
      }
      if (id === cellId) break;
    }

    return cumulative;
  }).join("\n");
};
