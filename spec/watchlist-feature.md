# Watchlist Feature - Specification

## 1. Overview

Add a watchlist feature that allows users to save movies and TV shows for later viewing. The watchlist persists across browser sessions using localStorage.

## 2. Requirements

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-1 | Users can add movies/TV shows to their watchlist |
| FR-2 | Users can remove items from their watchlist |
| FR-3 | Watchlist persists across browser sessions |
| FR-4 | Users can view all saved items on a dedicated page |
| FR-5 | Users can navigate to item details from the watchlist |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | Toggle action responds within 100ms |
| NFR-2 | Watchlist page loads saved items instantly (no API call) |
| NFR-3 | UI follows existing app design patterns |

## 3. Design Approach

### State Management

- **New Context:** `watchlistContext.tsx` (follows `themeContext.tsx` pattern)
- **Storage:** localStorage with key `"watchlist"`
- **No Redux:** Keeps it simple; watchlist is local-only data

### Data Structure

```typescript
interface IWatchlistItem {
  id: string;
  poster_path: string;
  original_title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  category: "movie" | "tv";  // Required for routing
  addedAt: number;           // Timestamp for sorting
}
```

### UI Components

| Component | Change | Description |
|-----------|--------|-------------|
| `MovieCard` | Modify | Add bookmark toggle icon (top-right) |
| `Watchlist` | New | Page to display saved items |
| `Header/Sidebar` | Modify | Add navigation link |

### Icon Choice

- Empty: `BsBookmark` (outline)
- Filled: `BsBookmarkFill` (solid red)
- From: `react-icons/bs` (already installed)

## 4. Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| State | React Context | Matches existing pattern |
| Storage | localStorage | Simple, no backend needed |
| Icons | react-icons | Already in project |
| Styling | Tailwind CSS | Matches existing styles |
| Animation | Framer Motion | Matches existing patterns |

## 5. Implementation Phases

### Phase 1: Core Infrastructure

**Files:**
- `src/types.d.ts` - Add `IWatchlistItem` interface
- `src/utils/helper.ts` - Add `saveWatchlist`/`getWatchlist` functions
- `src/context/watchlistContext.tsx` - New context with add/remove/toggle
- `src/main.tsx` - Wrap app with `WatchlistProvider`

**Test:** Open browser console, verify no errors.

### Phase 2: MovieCard Toggle

**Files:**
- `src/common/MovieCard/index.tsx` - Add bookmark button

**Test:**
1. Hover on any movie card - bookmark icon appears
2. Click bookmark - icon turns solid red
3. Check localStorage in DevTools - item saved
4. Refresh page - icon still solid red

### Phase 3: Watchlist Page

**Files:**
- `src/pages/Watchlist/index.tsx` - New page component
- `src/App.tsx` - Add `/watchlist` route

**Test:**
1. Navigate to `http://localhost:5174/watchlist`
2. See empty state with "Browse Movies" button
3. Add items from home page
4. Return to watchlist - items display
5. Click item - navigates to correct detail page

### Phase 4: Navigation

**Files:**
- `src/constants/index.ts` - Add watchlist to `navLinks`

**Test:**
1. See "Watchlist" in header navigation
2. See "Watchlist" in mobile sidebar
3. Click navigates to watchlist page

## 6. Verification Checklist

- [ ] Bookmark icon appears on hover for all MovieCards
- [ ] Clicking bookmark toggles add/remove
- [ ] Saved items persist after page refresh
- [ ] Watchlist page shows all saved items
- [ ] Empty watchlist shows helpful message
- [ ] Items sorted by most recently added
- [ ] Clicking watchlist item goes to correct detail page
- [ ] Navigation link appears in header and sidebar
- [ ] Works for both movies and TV shows

## 7. Files Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/types.d.ts` | Edit | Add IWatchlistItem interface |
| `src/utils/helper.ts` | Edit | Add localStorage helpers |
| `src/context/watchlistContext.tsx` | Create | Watchlist state management |
| `src/main.tsx` | Edit | Add WatchlistProvider |
| `src/common/MovieCard/index.tsx` | Edit | Add bookmark toggle |
| `src/pages/Watchlist/index.tsx` | Create | Watchlist page |
| `src/App.tsx` | Edit | Add route |
| `src/constants/index.ts` | Edit | Add nav link |
