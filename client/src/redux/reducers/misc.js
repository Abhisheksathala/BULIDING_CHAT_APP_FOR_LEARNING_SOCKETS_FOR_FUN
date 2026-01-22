import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenuFriend: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMember: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    group: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState: initialState,
  reducers: {
    setIsNewGroup:(state,action)=>{
      state.isNewGroup = action.payload
    },
    setIsAddMember:(state,action)=>{
      state.isAddMember = action.payload
    },
    setIsNotification:(state,action)=>{
      state.isNotification = action.payload
    },
    setIsMobileMenuFriend:(state,action)=>{
      state.isMobileMenuFriend = action.payload
    },
    setIsSearch:(state,action)=>{
      state
    }
  },
});

export default miscSlice;

export const {} = miscSlice.actions;
