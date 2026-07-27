# Iron Dog Strength - Complete Project Backup

## Project Overview

Iron Dog Strength is a comprehensive fitness and wellness platform focused on strength conditioning and self-defense training. The application provides a modern web interface for clients to book appointments, view programs, and manage their training sessions with Master Dessie L. Cheers.

## Features Implemented

- **Egyptian-inspired Design**: Complete theme with Caduceus, scales of life/death, Ankh, Was Scepter, and Eye of Ra symbols
- **Light Ice Blue Theme**: Consistent gradients throughout, no white backgrounds
- **Booking System**: Interactive calendar with real-time availability checking
- **Client Portal**: Customer dashboard for managing appointments and agreements
- **Digital Signatures**: Legal agreement signing with base64 storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript Full-Stack**: Type-safe development with shared schemas

## Technology Stack

### Frontend
- React 18 with TypeScript
- Wouter for client-side routing
- Tailwind CSS with custom design system
- Radix UI primitives with shadcn/ui components
- TanStack Query for server state management
- Vite for development and production builds

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- Drizzle ORM for database operations
- PostgreSQL with Neon serverless hosting
- Digital signature handling

### Development Tools
- Vite with HMR
- TypeScript compilation
- ESBuild for production bundling
- Drizzle Kit for schema management

## Project Structure

```
/client         # React frontend application
  /src
    /components # UI components including Egyptian symbols
    /pages      # Route pages (Home, About, Programs, Contact, Schedule, Client Portal)
    /hooks      # Custom React hooks
    /lib        # Utilities and API configuration
/server         # Express.js backend
  /routes.ts    # API endpoints
  /storage.ts   # Database abstraction layer
  /db.ts        # Database connection
/shared         # Shared TypeScript types and schemas
/attached_assets # User-provided assets (training documents, etc.)
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

3. **Database Setup**
   ```bash
   npm run db:push
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Production Build**
   ```bash
   npm run build
   ```

## Design Vision

- **Egyptian-inspired wellness center** concept featuring sacred symbols
- **Transformation theme** representing choices through training and mental revelation
- **Light ice blue gradients** with consistent theming throughout
- **Dark iron-blue text** colors on light backgrounds for excellent readability
- **Egyptian symbols** displayed prominently in dark colors on white icon boxes

## Database Schema

- **Users**: Authentication and admin management
- **Clients**: Customer profiles with contact and health information
- **Appointments**: Booking system with scheduling and status tracking
- **Agreements**: Digital signature storage for liability waivers
- **Contact Messages**: Lead management system

## Key Pages

1. **Home**: Marketing landing page with program overview and Egyptian symbols
2. **Programs**: Detailed service offerings and pricing with package deals
3. **About**: Coach biography, credentials, and training philosophy
4. **Schedule**: Interactive booking system with calendar and form
5. **Contact**: Lead generation form with contact information
6. **Client Portal**: Customer dashboard for appointment management

## API Endpoints

- `GET /api/clients` - Client management
- `GET /api/appointments` - Appointment scheduling
- `GET /api/agreements` - Digital signature handling
- `POST /api/contact` - Contact form submissions
- `GET /api/availability` - Calendar availability checking

## Deployment Notes

- Optimized for Replit Deployments
- Uses PostgreSQL for data persistence
- Responsive design for all device sizes
- SEO-optimized with proper meta tags
- Production-ready with error handling

## Recent Updates (January 18, 2025)

- ✅ Implemented complete light ice blue theme consistency
- ✅ Fixed Egyptian symbol visibility with proper contrast
- ✅ Eliminated all white backgrounds throughout the app
- ✅ Enhanced text readability with dark iron-blue colors
- ✅ Fixed Training Location section visibility issues
- ✅ Applied consistent theming across all pages and components

## Support

For questions or issues with this codebase, refer to the comprehensive documentation in `replit.md` or contact the development team.

---

*This backup contains the complete Iron Dog Strength application as of January 18, 2025, with all features implemented and themed consistently.*