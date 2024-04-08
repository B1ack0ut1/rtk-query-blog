import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(selectUsersResult, (usersResult) => {
  console.log(usersResult);
  return usersResult?.data; // Normalized state object with ids & entities
});

// const emptyUsers = [];

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => {
//     console.log(usersResult);
//     return usersResult?.data ?? emptyUsers;
//   }
// );

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find((user) => user.id === userId)
// );

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

export default usersApiSlice.reducer;
