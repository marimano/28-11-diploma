import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDestinations = createAsyncThunk('destination/fetchDestinations', async () => {
  const { data: { destination } } = await axios.get('/static/db.json');

  return destination;
});

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: {
    list: [],
    selectedDestination: null,
    isLoading: false
  },
  reducers: {
    setDestination: (prevState, { payload }) => {
      prevState.selectedDestination = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchDestinations.pending, (prevState) => {
      prevState.isLoading = true;
    });
    builder.addCase(fetchDestinations.fulfilled, (prevState, { payload }) => {
      prevState.list = payload;
      prevState.isLoading = false;
    });
  }
});

export const { setDestination } = destinationSlice.actions;

export default destinationSlice.reducer;