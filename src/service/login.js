import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");
export const login = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
    prepareHeaders: (headers) => {
      const apiKey = getToken();
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    getUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data?.access_token; 
          if (token) {
           
            localStorage.setItem("token", token);
          }
        } catch (error) {
          console.error("Login error", error);
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile", 
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserMutation, useGetProfileQuery  } = login;
