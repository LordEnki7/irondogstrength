# Iron Dog Strength Fitness Training Platform

## Overview
Iron Dog Strength is a comprehensive fitness training platform focused on strength conditioning and self-defense training. The application provides a modern web interface for clients to book appointments, view programs, and manage their training sessions with Master Dessie L. Cheers. The business vision emphasizes an Egyptian-inspired wellness concept, representing transformation through training and mental revelation, aiming for broad market potential in fitness and self-defense.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with a custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **UI/UX Decisions**: Light ice blue theme with consistent gradients, dark iron-blue text on light backgrounds, Egyptian symbols in dark iron-blue on white icon boxes, and integration of an Egyptian silhouette image as a faded background element.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **Development**: Hot reloading with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Session Storage**: PostgreSQL-backed sessions using `connect-pg-simple`

### Key System Features
- **Database Schema**: Includes Users, Clients, Appointments, Agreements, and Contact Messages.
- **API Structure**: RESTful API with Zod validation and centralized error handling.
- **User Interface Pages**: Home, Programs, About, Schedule, Contact, and Client Portal.
- **Booking System**: Interactive calendar, real-time availability, multi-step process, and digital signature collection.
- **Content Management System**: Database-backed system for managing all text and visual content with real-time updates from an admin panel. All content sections have individual save buttons with instant database persistence.
- **Dynamic About Page**: Fully integrated with content management system, displaying coach experience, philosophy titles, biography, and other content dynamically from database.
- **Motivational Quote Generator**: Interactive system with 25+ quotes across six categories, integrated into the client portal and home page.
- **The Grind Multimedia Section**: Dedicated page for gym workout videos and client transformation images.
- **Daily Motivation Audio Player**: Floating audio player featuring a personal motivational message from Master Cheers, integrated into key pages.

### Monorepo Structure
- `/client`: React frontend application
- `/server`: Express.js backend
- `/shared`: Shared TypeScript types and schemas
- `/migrations`: Database migration files

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **Date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Production bundling for server code