# AGENTS.md - Coding Agent Guidelines

This file provides essential context for AI coding agents operating in this repository.

## Project Overview

**Project:** food-peru - A Next.js web application  
**Tech Stack:** Next.js 16.1.6 (App Router) | React 19.2.3 | TypeScript 5 (strict) | Tailwind CSS v4 | Bun | ESLint 9

---

## Commands

### Development
```bash
bun dev          # Start dev server (localhost:3000)
bun run build    # Production build
bun start        # Start production server
```

### Linting & Type Checking
```bash
bun run lint                    # ESLint on entire project
bunx eslint app/page.tsx        # Lint single file
bunx eslint app/ --fix          # Auto-fix issues
bunx tsc --noEmit               # Type-check project
```

### Testing (not yet configured)
```bash
# When tests are added (recommend Vitest):
# bun test                      # Run all tests
# bun test path/to/file.test.ts # Run single test
```

---

## Project Structure

```
app/                    # Next.js App Router
├── layout.tsx          # Root layout (fonts, metadata)
├── page.tsx            # Home page
├── globals.css         # Global styles + Tailwind
└── [feature]/page.tsx  # Feature routes
components/             # Shared components (create as needed)
lib/                    # Utilities (create as needed)
types/                  # Type definitions (create as needed)
public/                 # Static assets
```

---

## Code Style

### TypeScript
- **Strict mode enabled** - no implicit any, null checks required
- Explicit types for function params and returns
- Use `type` for shapes, `interface` for extendable contracts
- Prefer `unknown` over `any`

### Imports
- Use `@/*` path alias (maps to project root)
- Order: React/Next.js → external → internal → types
- Use `import type` for type-only imports

```typescript
import { useState } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
```

### React Components
- Function declarations: `export default function ComponentName()`
- `Readonly<>` wrapper for props
- Co-locate component-specific types

```typescript
export default function UserCard({
  user,
}: Readonly<{ user: User }>) {
  return <div>{user.name}</div>;
}
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Utilities/hooks | camelCase | `useAuth.ts` |
| Types | PascalCase | `type UserData` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES` |
| Route folders | kebab-case | `app/user-settings/` |

### Tailwind CSS v4
- Use `@import "tailwindcss"` syntax
- Theme variables via `@theme inline` in globals.css
- Dark mode: `dark:` prefix (uses `prefers-color-scheme`)
- Semantic colors: `bg-background`, `text-foreground`

### Error Handling
- try/catch for async operations
- Meaningful error messages
- Error Boundaries for client components
- error.tsx for route-level errors

---

## Next.js Conventions

- **Server Components by default** - no directive needed
- `"use client"` only for hooks, events, browser APIs
- Keep client components small, push to leaf nodes
- Export `metadata` from page/layout for SEO
- Use `next/image` with `alt` text always

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Description for SEO",
};
```

---

## Git Conventions

- Concise commits focusing on "why" not "what"
- Atomic commits - one logical change each
- Branches: `feature/desc`, `fix/desc`, `chore/desc`

---

## Common Pitfalls

1. Don't use `"use client"` unnecessarily
2. Don't forget `alt` on images
3. Don't use `any` type
4. Don't import from `node_modules` paths
5. Don't hardcode colors - use Tailwind theme variables
