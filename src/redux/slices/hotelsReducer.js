import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
  const { data: { hotels } } = await axios.get('/static/db.json');
  const { data: imgData } = await axios.get('/static/imgs.json');

  hotels.forEach(hotel => {
    hotel.url = imgData.find(({ id }) => id === hotel.id)?.url || '';
  });

  return hotels;
});

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    list: [],
    isLoading: false
  },
  extraReducers: builder => {
    builder.addCase(fetchHotels.pending, (prevState) => {
      prevState.isLoading = true;
    });
    builder.addCase(fetchHotels.fulfilled, (prevState, { payload }) => {
      prevState.list = payload;
      prevState.isLoading = false;
    });
  }
});

export default hotelsSlice.reducer;