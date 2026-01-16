# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tMovies is a React movie/TV series application that uses the TMDB API. Users can search, browse, and view trailers for movies and TV shows.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

No test or lint commands are configured.

## Architecture

### Tech Stack
- React 18 + TypeScript + Vite
- Redux Toolkit + RTK Query (API data fetching)
- React Context (theme + UI state)
- Tailwind CSS (dark mode via `class` strategy)
- Framer Motion (animations)
- React Router DOM 6

### Routing Structure
```
/              → Home (hero + featured sections)
/:category     → Catalog (movie or tv, with search/pagination)
/:category/:id → Detail view
*              → 404 Not Found
```

### State Management
- **RTK Query** (`src/services/TMDB.ts`): All TMDB API calls via `useGetShowsQuery`, `useGetShowQuery`
- **ThemeContext** (`src/context/themeContext.tsx`): Dark/light mode with localStorage persistence
- **GlobalContext** (`src/context/globalContext.tsx`): Modal and sidebar state

### Key Directories
- `src/common/` - Reusable UI components (barrel exported from `index.ts`)
- `src/pages/` - Route pages with page-specific `components/` subfolders
- `src/context/` - React Context providers
- `src/hooks/` - Custom hooks (motion animations, click outside, key press)
- `src/services/` - RTK Query API definitions
- `src/utils/` - Config and helpers (`cn()` for class merging, localStorage utils)
- `src/constants/` - App constants (nav links, theme options, section configs)

### Conventions
- Interface names prefixed with `I` (e.g., `IMovie`, `ITheme`)
- Path alias `@/*` maps to `src/*`
- Use `cn()` utility from `utils/helper.ts` for Tailwind class composition
- Context patterns: create context → export custom hook (e.g., `useTheme()`)
- Pages use React.lazy + Suspense for code splitting

### Environment Variables
Configured in `.env`, accessed via `import.meta.env.VITE_*`:
- `VITE_API_KEY` - TMDB API key
- `VITE_TMDB_API_BASE_URL` - TMDB base URL

## Development Best Practices

### Testing
- Write tests for each implementation step before moving to the next
- Verify changes work in the browser after each modification
- Run `npm run build` to catch TypeScript errors before committing

### Commits
- Write descriptive commit messages that explain the "why" not just the "what"
- Keep commits focused on a single logical change
- Reference related issues or features in commit messages when applicable

### Following Existing Patterns
- Match the coding style of surrounding code
- Use existing utilities (e.g., `cn()` for classes) rather than creating new ones
- Follow established context patterns when adding new state management
- Place new components in appropriate directories (`common/` for reusable, `pages/*/components/` for page-specific)
- Export new common components from `src/common/index.ts`

### Code Quality
- Use TypeScript strictly; define interfaces for all props and data structures
- Prefer functional components with hooks
- Keep components focused and single-purpose
- Use meaningful variable and function names
- Handle loading and error states for async operations
