import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../api/api";
const getToken = () => localStorage.getItem("token");
export const login = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
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
        url: "/registration",
        method: "POST",
        body: newUser,
      }),
    }),
    getUser: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
      getUpdateUser:builder.mutation({
        query:(user)=>({
          url:`api/customers/update/`,
          methot:"PUT",
          body:user
        })
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data?.accessToken; 
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
        url: "/api/customers/info", 
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserMutation, useGetProfileQuery  } = login;
