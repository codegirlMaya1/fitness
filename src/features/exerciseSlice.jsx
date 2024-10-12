import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: [],
  reducers: {
    addExercise: (state, action) => {
      state.push(action.payload);
    },
    deleteExercise: (state, action) => {
      return state.filter(exercise => exercise.id !== action.payload);
    },
    updateExerciseDetails: (state, action) => {
      const index = state.findIndex(exercise => exercise.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.details };
      }
    }
  }
});

export const { addExercise, deleteExercise, updateExerciseDetails } = exerciseSlice.actions;
export default exerciseSlice.reducer;


