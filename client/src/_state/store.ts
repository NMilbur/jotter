import { configureStore } from "@reduxjs/toolkit";
import cellSlice, { insertCellAfter } from "./cells/cellSlice";
import { CELL_ACTIONS } from "./constants";

export const store = configureStore({ reducer: { cells: cellSlice } });

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(insertCellAfter({ id: null, type: "text" }));
store.dispatch(insertCellAfter({ id: null, type: "code" }));
store.dispatch(insertCellAfter({ id: null, type: "text" }));
