import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN } from "../api/api";

export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      const apiKey = TOKEN;
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }
      return headers;
    },
  }),
  endpoints:(builder)=>({
    getFilteredContent: builder.query({
        query: ({ type, year, page }) => {
          const path = type === "movie" ? "discover/movie" : "discover/tv";
          return `/${path}?page=${page}&primary_release_year=${year}&sort_by=popularity.asc`;
        },
      }),
  }),
});


export const {  useGetFilteredContentQuery } = filterApi