import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'


type appState = {
  errorMsg: string
}

const initialState: appState = {
  errorMsg: ''
}

export const app = createSlice({
  name: "app",
  // 初始值
  initialState,
  reducers: {
    setErrorMsg(state, {payload}: PayloadAction<string>) {
      state.errorMsg = payload
    }
  },
});

// 导出actions
export const { setErrorMsg } = app.actions;

// 内置了thunk插件，可以直接处理异步请求
// export const asyncIncrement = (payload: any) => (dispatch: any) => {
//   setTimeout(() => {
//     dispatch(increment(payload));
//   }, 2000);
// };
export default app.reducer;
