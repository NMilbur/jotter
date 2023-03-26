import { configureStore } from "@reduxjs/toolkit";
import cellSlice, { insertCellAfter } from "./cells/cellSlice";
import bundleSlice from "./bundles/bundleSlice";

export const store = configureStore({ reducer: { cells: cellSlice, bundles: bundleSlice } });

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(insertCellAfter({ id: null, type: "text" }));
store.dispatch(insertCellAfter({ id: null, type: "code" }));
store.dispatch(insertCellAfter({ id: null, type: "text" }));
