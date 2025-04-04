import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../global/api";
import { actionModel } from "./actionModel";

// Define the shape of the state
interface ActionState {
  data: actionModel[];
  status: "idle" | "failed" | "succeeded" | "loading";
  error: string | null;
}

const initialState: ActionState = {
  data: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch actions
export const fetchactions = createAsyncThunk("fetchActions", async () => {
  try {
    const result = await fetchData("http://127.0.0.1:8000/actions"); // Fetch actions data

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
    console.error("Error fetching actions: ", error);
    throw error; // Rethrow to trigger the rejected case
  }
});

const actionSlice = createSlice({
  name: "actions",
  initialState,

  reducers: {
    // Reset or add a new action
    addNewAction: {
      reducer(state, action: PayloadAction<actionModel>) {
        state.data.push(action.payload); // Add new action to the state
      },

      prepare(bidsState: actionModel) {
        return { payload: bidsState }; // Prepare the payload for resetting
      },
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchactions.fulfilled,
        (state, action: PayloadAction<ActionState>) => {
          // Ensure the data returned is structured correctly
          state.data = action.payload.data || []; // Default to empty array if no data
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(fetchactions.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

// export a function for getting an action by event id
export const getActionByEventId =
  (id: number) => (state: { actions: ActionState }) =>
    state.actions.data.find((action) => Number(action.eventId) === id);

// export all the user activities
export const { addNewAction } = actionSlice.actions;

export default actionSlice.reducer;
