export const TMDB_API_BASE_URL: string =
  import.meta.env.VITE_TMDB_API_BASE_URL || "https://api.themoviedb.org/3";
export const API_KEY: string =
  import.meta.env.VITE_API_KEY || "fb4a2cf9cd8004e46596605a7f8cc93d";

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const GOOGLE_AD_SLOT=import.meta.env.VITE_GOOGLE_AD_SLOT;
export const GOOGLE_AD_CLIENT=import.meta.env.VITE_GOOGLE_AD_CLIENT

export const THROTTLE_DELAY = 150;
