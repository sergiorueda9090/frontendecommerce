import { createSlice } from '@reduxjs/toolkit'

export const Shared = createSlice({
  name: 'Shared',
  initialState: {
    openBackDropStore:false,
    openModalStore:false,
    openLinearProgress:false
  },
  reducers: {
    showBackDropStore:(state) => {
      state.openBackDropStore = true
    },
    hideBackDropStore:(state) => {
      state.openBackDropStore = false
    },
    openModalShared:(state, action) => {
        state.openModalStore = true;
    },
    closeModalShared:(state, action) => {
        state.openModalStore    = false;
    },
    showLinearProgress:(state, action) => {
      state.openLinearProgress = true;
    },
    hideLinearProgress:(state, action) => {
      state.openLinearProgress = false;
    }
  }
})

// Action creators are generated for each case reducer function
export const { showBackDropStore, hideBackDropStore, openModalShared, closeModalShared, showLinearProgress, hideLinearProgress } = Shared.actions;