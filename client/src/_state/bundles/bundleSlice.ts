import { createSlice } from "@reduxjs/toolkit";
import { BUNDLE_ACTIONS } from "_state/constants";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    [BUNDLE_ACTIONS.startBundle]: (state: BundlesState, action) => {
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
    },
    [BUNDLE_ACTIONS.completeBundle]: (state: BundlesState, action) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    },
  },
});

export const { startBundle, completeBundle } = bundleSlice.actions;

export default bundleSlice.reducer;
