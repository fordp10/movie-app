import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_KEY, TMDB_API_BASE_URL } from "@/utils/config";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({
        category,
        page,
        showSimilarShows,
        id,
      }: {
        category: string | undefined;
        page?: number;
        showSimilarShows?: boolean;
        id?: number;
      }) => {
        if (showSimilarShows) {
          return `${category}/${id}/similar?api_key=${API_KEY}`;
        }

        // For TV shows, use person's TV credits (discover/tv doesn't support with_cast)
        if (category === "tv") {
          return `person/12836/tv_credits?api_key=${API_KEY}`;
        }

        // For movies, use discover with Tom Cruise
        return `discover/movie?api_key=${API_KEY}&with_cast=500&page=${page}&sort_by=popularity.desc`;
      },
      transformResponse: (response: any, meta, arg) => {
        // TV credits endpoint returns { cast: [], crew: [] }, transform to { results: [] }
        if (arg.category === "tv" && response.cast) {
          return { results: response.cast };
        }
        return response;
      },
    }),

    getShow: builder.query({
      query: ({ category, id }: { category: string; id: number }) =>
        `${category}/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetShowsQuery, useGetShowQuery } = tmdbApi;
