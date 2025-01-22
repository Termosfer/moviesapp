import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '../api/api';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => {
      const apiKey = TOKEN;
      if (apiKey) {
        headers.set('Authorization', `Bearer ${apiKey}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMovieByName: builder.query({
      query: () => "trending/movie/day",
    }),
    getTVshows: builder.query({
      query: () => "trending/tv/day"
    }),
    getPopularMovies: builder.query({
      query: () => "movie/popular"
    }),
    getPopularTvShows: builder.query({
      query: () => "tv/popular"
    }),
    getNowPlayingMovies: builder.query({
      query:(page)=>`/movie/now_playing?page=${page}`
    }),
    getNowPlayingTv: builder.query({
      query:(page)=>`/tv/on_the_air?&page=${page}`
    }),
    getUpcomingMovies: builder.query({
      query: (page) => `/movie/upcoming?page=${page}`
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}`
    }),
    getTvDetails: builder.query({
      query: (id) => `/tv/${id}`
    }),
    getTvSeasonDetails: builder.query({
      query: ({id, seasonNumber}) => `/tv/${id}/season/${seasonNumber}`
    }),
    getTvSeasonsVideo:builder.query({
      query:({id, seasonNumber, episode})=>`tv/${id}/season/${seasonNumber}/episode/${episode}/videos`
    }),
    getCastsId: builder.query({
      query: (id) => `movie/${id}/credits`
    }),
    getTvCastsId: builder.query({
      query: (id) => `tv/${id}/credits`
    }),
    getRecommentId: builder.query({
      query: (id) => `movie/${id}/recommendations`
    }),
    getTvRecommentId: builder.query({
      query: (id) => `tv/${id}/recommendations`
    }),
    getMovieYoutubeId: builder.query({
      query: (id) => `movie/${id}/videos`,
    }),
    getTvYoutubeId: builder.query({
      query: (id) => `tv/${id}/videos`,
    }),
    getSearchId: builder.query({
      query: ({ query, page }) => `search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
    }),
    getGenresMovieList: builder.query({
      query: () => "genre/movie/list"
    })
  }),
})

export const { useGetMovieByNameQuery, useGetTVshowsQuery, useGetPopularMoviesQuery, useGetPopularTvShowsQuery, useGetUpcomingMoviesQuery, useGetMovieDetailsQuery, useGetTvDetailsQuery, useGetCastsIdQuery, useGetRecommentIdQuery, useGetTvCastsIdQuery, useGetTvRecommentIdQuery, useGetMovieYoutubeIdQuery, useGetTvYoutubeIdQuery, useGetSearchIdQuery, useGetGenresMovieListQuery, useGetTvSeasonDetailsQuery, useGetTvSeasonsVideoQuery, useGetNowPlayingMoviesQuery, useGetNowPlayingTvQuery } = movieApi
