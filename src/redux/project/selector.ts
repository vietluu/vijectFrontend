import { RootState } from "../../hook/store";
export const projectSelector = (state: RootState): typeof state.projectReducer =>
  state.projectReducer;
