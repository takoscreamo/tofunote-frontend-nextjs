# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TOFU NOTE is a mental health tracking application built with Next.js 15 (App Router) that visualizes and records mental state scores. Users track their "tofu mental" (fragile mental state) through daily diary entries and visual graph representations.

## Commands

```bash
npm run dev          # Start dev server with turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Jest unit tests
npm run test:watch   # Jest watch mode
npm run e2e          # Run Playwright E2E tests
npm run e2e:headed   # E2E tests with browser visible
```

Run a single test file:
```bash
npx jest src/__tests__/components/Button.test.tsx
npx playwright test e2e/example.spec.ts
```

## Tech Stack

- **Next.js 15.3** with App Router (not Pages Router)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** for styling
- **Jotai** for global state (auth tokens, login state)
- **SWR** for data fetching with caching
- **Axios** for HTTP requests with JWT interceptors
- **Recharts** for graph visualization
- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E tests

## Architecture

### Route Structure (App Router)
- `src/app/(app)/` - Protected routes requiring authentication (diary, graph, settings, etc.)
- `src/app/(auth)/` - Authentication routes (login)
- Route groups use parentheses to organize without affecting URL structure

### Key Directories
- `src/atoms/` - Jotai atoms for global state (auth.ts manages JWT tokens)
- `src/components/common/` - Reusable components (AuthGuard, HamburgerMenu, etc.)
- `src/components/ui/` - UI primitives (Button, DatePicker, MentalScoreSlider)
- `src/fetch/` - API communication (authAxios.ts with auto-refresh, fetchers for SWR)
- `src/hooks/` - Custom hooks (useDiaryForm, useSwr)
- `src/types/openapi.d.ts` - Auto-generated from OpenAPI spec
- `src/utils/endpoints.ts` - Centralized API endpoint definitions

### Import Alias
Use `@/` for imports from `src/`:
```typescript
import { Button } from '@/components/ui/Button'
```

## Authentication Flow

- JWT-based authentication with automatic token refresh
- Guest login stores refresh_token in localStorage
- `AuthGuard` component protects routes, redirects to `/login` if unauthenticated
- `authAxios.ts` intercepts 401 responses and refreshes tokens automatically
- Concurrent refresh protection prevents duplicate refresh calls

## API Communication Pattern

```typescript
// Fetchers return {data, err} structure
const result = await fetcherPost(url, body);
if (result.err) { /* handle error */ }
else { /* use result.data */ }
```

Backend URL configured via `NEXT_PUBLIC_BACKEND_URL` environment variable.

## Testing Notes

- Jest ignores `e2e/` directory (separate Playwright tests)
- Jest mocks: ResizeObserver, Next.js router, SWR (configured in jest.setup.js)
- Playwright runs against localhost:3000, auto-starts dev server
- WebKit disabled in Playwright due to macOS compatibility issues

## OpenAPI Type Generation

Regenerate TypeScript types after OpenAPI spec changes:
```bash
npx openapi-typescript openapi.yml -o src/types/openapi.d.ts
```

## Environment Setup

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_BACKEND_URL` to the backend API URL.
