import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";
import { Cell } from "_state/cells";
import { CELL_ACTIONS } from "_state/constants";

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
    [CELL_ACTIONS.updateCell]: (state: CellState, action) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    [CELL_ACTIONS.deleteCell]: (state: CellState, action) => {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
    },
    [CELL_ACTIONS.moveCell]: (state: CellState, action) => {
      const { direction } = action.payload;
      const idx = state.order.findIndex((id) => id === action.payload.id);
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;

      if (targetIdx < 0 || targetIdx > state.order.length - 1) return;

      state.order[idx] = state.order[targetIdx];
      state.order[targetIdx] = action.payload.id;
    },
    [CELL_ACTIONS.insertCellAfter]: (state: CellState, action) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: uuidv4(),
      };

      state.data[cell.id] = cell;

      const foundIdx = state.order.findIndex((id) => id === action.payload.id);

      if (foundIdx < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIdx + 1, 0, cell.id);
      }
    },
  },
});

export const { updateCell, deleteCell, moveCell, insertCellAfter } = cellSlice.actions;

export default cellSlice.reducer;
