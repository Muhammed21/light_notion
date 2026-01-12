# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo containing:
- **apps/app** - Expo React Native mobile/web app (React 19, Expo 54, Expo Router)
- **apps/payload** - Payload CMS backend with Next.js 15 and SQLite
- **packages/types** - Shared TypeScript types and Zod schemas
- **packages/eslint-config** - Shared ESLint configuration
- **packages/typescript-config** - Shared TypeScript configuration

## Common Commands

```bash
# Development
pnpm dev                          # Start all apps
pnpm dev --filter=payload         # Just Payload CMS (http://localhost:3000)
pnpm dev --filter=app             # Just Expo app

# Building
pnpm build                        # Build all apps/packages

# Linting & Formatting
pnpm lint                         # Lint all projects
pnpm format                       # Format with Prettier
pnpm check-types                  # TypeScript check

# Testing (in apps/payload)
pnpm test                         # Run all tests
pnpm test:int                     # Integration tests (Vitest)
pnpm test:e2e                     # E2E tests (Playwright)

# Payload CMS type generation (in apps/payload)
pnpm payload generate:types       # Generate TypeScript types after schema changes
pnpm payload generate:importmap   # Generate import map after creating components
```

## Architecture

### Data Flow
```
apps/app (Expo) ──HTTP/REST──> apps/payload (Payload CMS) ──> SQLite
                                      │
                                      ▼
                              packages/types (shared Zod schemas)
```

### Key Integration Points
- Payload generates types into `packages/types/src/payload/payload.dto.ts`
- App fetches data from Payload using TanStack React Query
- Rich text content uses Lexical format (`@payloadcms/richtext-lexical`)

### Payload Collections
Located in `apps/payload/src/collections/`:
- **Users** - Authentication-enabled users
- **Media** - File uploads with alt text
- **Document** - Custom content with title and richText

## Critical Payload CMS Patterns

### Security: Local API Access Control
```typescript
// ❌ WRONG: Access control bypassed when passing user
await payload.find({ collection: 'posts', user: someUser })

// ✅ CORRECT: Always set overrideAccess: false with user
await payload.find({ collection: 'posts', user: someUser, overrideAccess: false })
```

### Transaction Safety in Hooks
```typescript
// Always pass req to nested operations for atomicity
await req.payload.create({
  collection: 'audit-log',
  data: { docId: doc.id },
  req,  // REQUIRED for same transaction
})
```

### After Schema Changes
1. Run `pnpm payload generate:types`
2. Run `tsc --noEmit` to validate TypeScript

## Testing

### Payload Integration Tests (Vitest)
- Location: `apps/payload/tests/int/`
- Pattern: `*.int.spec.ts`
- Uses in-memory SQLite

### Payload E2E Tests (Playwright)
- Location: `apps/payload/tests/e2e/`
- Pattern: `*.e2e.spec.ts`
- Auto-starts dev server

## Additional Context

Detailed Payload CMS development rules are in `apps/payload/AGENTS.md` covering:
- Collections, fields, and hooks patterns
- Access control (collection, field, row-level)
- Custom components and endpoints
- Plugin development
