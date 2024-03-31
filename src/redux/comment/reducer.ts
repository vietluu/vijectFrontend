import { RootState } from "../../hook/store";

const commentSelector = (state: RootState) => state.commentReducer;
export default commentSelector;