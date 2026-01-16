import React, { useContext, useState, useCallback } from "react";
import { saveWatchlist, getWatchlist } from "@/utils/helper";
import { IWatchlistItem, IMovie } from "@/types";

interface IWatchlistContext {
  watchlist: IWatchlistItem[];
  addToWatchlist: (item: IMovie, category: "movie" | "tv") => void;
  removeFromWatchlist: (id: string) => void;
  toggleWatchlist: (item: IMovie, category: "movie" | "tv") => void;
  isInWatchlist: (id: string) => boolean;
}

const context = React.createContext<IWatchlistContext>({
  watchlist: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  toggleWatchlist: () => {},
  isInWatchlist: () => false,
});

interface Props {
  children: React.ReactNode;
}

const initialWatchlist = getWatchlist();

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<IWatchlistItem[]>(initialWatchlist);

  const addToWatchlist = useCallback((item: IMovie, category: "movie" | "tv") => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) return prev;

      const newItem: IWatchlistItem = {
        id: item.id,
        poster_path: item.poster_path,
        original_title: item.original_title,
        name: item.name,
        overview: item.overview,
        backdrop_path: item.backdrop_path,
        category,
        addedAt: Date.now(),
      };

      const newWatchlist = [newItem, ...prev];
      saveWatchlist(newWatchlist);
      return newWatchlist;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => {
      const newWatchlist = prev.filter((item) => item.id !== id);
      saveWatchlist(newWatchlist);
      return newWatchlist;
    });
  }, []);

  const toggleWatchlist = useCallback((item: IMovie, category: "movie" | "tv") => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        const newWatchlist = prev.filter((w) => w.id !== item.id);
        saveWatchlist(newWatchlist);
        return newWatchlist;
      } else {
        const newItem: IWatchlistItem = {
          id: item.id,
          poster_path: item.poster_path,
          original_title: item.original_title,
          name: item.name,
          overview: item.overview,
          backdrop_path: item.backdrop_path,
          category,
          addedAt: Date.now(),
        };
        const newWatchlist = [newItem, ...prev];
        saveWatchlist(newWatchlist);
        return newWatchlist;
      }
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => {
      return watchlist.some((item) => item.id === id);
    },
    [watchlist]
  );

  return (
    <context.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
