import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../global/api";
import { eventModel } from "./eventModel";

// Define the shape of the state
interface EventsState {
  data: eventModel[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  status: "idle" | "failed" | "succeeded" | "loading";
  error: string | null;
}

const initialState: EventsState = {
  data: [],
  page: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  status: "idle",
  error: null,
};

const apiUrl =
  "https://cms.klanlogistics.com:8443/api/wylon-apis/protected?passcode=dataView123";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk("fetchEvents", async () => {
  try {
    const result = await fetchData(apiUrl); // Fetch events data

    console.log(result.data.data);
    if (!result || !result.data) {
      return initialState; // Return initial state if no result
    }
    // Ensure response has 'status' and data as expected
    if (result.data.status && result.data.status !== "OK") {
      return initialState;
    }
    // Return the full response structure, ensuring it matches the state
    return result.data;
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw error; // Rethrow to trigger the rejected case
  }
});

const eventSlice = createSlice({
  name: "events",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<EventsState>) => {
          // Ensure the data returned is structured correctly
          state.data = action.payload.data || []; // Default to empty array if no data
          state.size = action.payload.size || 0;
          state.page = action.payload.page || 0;
          state.totalElements = action.payload.totalElements || 0;
          state.totalPages = action.payload.totalPages || 0;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(fetchEvents.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

// Selector to get events from the state
export const getEvents = (state: { events: EventsState }) => state.events;
export const getEventById = (id: number) => (state: { events: EventsState }) =>
  state.events.data.find((event) => Number(event.id) === id);

export default eventSlice.reducer;
