import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";
import { Cell } from "_state/cells";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    cellUpdated: (state: CellState, action) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    cellDeleted: (state: CellState, action) => {
      delete state.data[action.payload];
      state.order.filter((id) => id !== action.payload);
    },
    cellMoved: (state: CellState, action) => {
      const { direction } = action.payload;
      const idx = state.order.findIndex((id) => id === action.payload.id);
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;

      if (targetIdx < 0 || targetIdx > state.order.length - 1) return;

      state.order[idx] = state.order[targetIdx];
      state.order[targetIdx] = action.payload.id;
    },
    cellInsertedBefore: (state: CellState, action) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: uuidv4(),
      };

      state.data[cell.id] = cell;

      const foundIdx = state.order.findIndex((id) => id === action.payload.id);

      if (foundIdx < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIdx, 0, cell.id);
      }
    },
  },
});

export const { cellUpdated, cellDeleted, cellMoved, cellInsertedBefore } = cellSlice.actions;

export default cellSlice.reducer;
