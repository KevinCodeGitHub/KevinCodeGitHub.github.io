# SmartSaver Recipe App

## Overview

SmartSaver is a recipe management application that allows users to save recipes from any URL by extracting ingredients and steps using AI, removing ads and unnecessary content. The app also includes a shopping list feature for managing grocery items.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite

The frontend follows a pages/components structure with:
- `client/src/pages/` - Route components (Home, RecipeDetail, ShoppingList)
- `client/src/components/` - Reusable UI components
- `client/src/components/ui/` - shadcn/ui primitives
- `client/src/hooks/` - Custom React hooks for data fetching

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **AI Integration**: OpenAI API for recipe parsing and image generation

The backend uses a storage layer pattern (`server/storage.ts`) that abstracts database operations, making it easy to swap implementations.

### Shared Code
- `shared/schema.ts` - Database schema definitions using Drizzle
- `shared/routes.ts` - API route definitions with Zod schemas for type-safe client-server communication

### Build System
- Development: `tsx` for running TypeScript directly
- Production: Custom build script using esbuild for server, Vite for client
- Database migrations: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and query building
- **connect-pg-simple**: Session storage in PostgreSQL

### AI Services
- **OpenAI API**: Used for recipe parsing from URLs and image generation
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Key NPM Packages
- **@tanstack/react-query**: Data fetching and caching
- **zod**: Runtime type validation
- **drizzle-zod**: Generate Zod schemas from Drizzle tables
- **framer-motion**: Animation library
- **wouter**: Lightweight React router
- **shadcn/ui components**: Built on Radix UI primitives