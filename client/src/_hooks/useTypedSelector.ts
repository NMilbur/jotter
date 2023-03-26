import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "_state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
