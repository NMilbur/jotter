import { combineReducers } from "redux";
import cellSlice from "_state/cells/cellSlice";

const reducers = combineReducers({
  reducer: cellSlice,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
