# Iron Dog Strength - Deployment Guide

## Quick Start Outside Replit

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### 1. Extract and Setup
```bash
# Extract the backup
tar -xzf iron-dog-strength-complete-backup.tar.gz
cd iron-dog-strength/

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/iron_dog_strength
NODE_ENV=development
PORT=5000
```

### 3. Database Setup
```bash
# Push schema to database
npm run db:push

# Or if you need to generate migrations first
npx drizzle-kit generate:pg
npx drizzle-kit migrate
```

### 4. Development Server
```bash
# Start development server (runs both frontend and backend)
npm run dev
```

The application will be available at `http://localhost:5000`

### 5. Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## Key Features

### Egyptian-Themed Design
- Custom SVG symbols integrated throughout
- Light ice blue theme with gradients
- No white backgrounds for visual consistency
- Dark iron-blue text for excellent readability

### Booking System
- Interactive calendar with real-time availability
- Multi-step booking process
- Digital signature collection
- Email-based client portal access

### Database Schema
The app uses the following main tables:
- `users` - Admin authentication
- `clients` - Customer information
- `appointments` - Booking data
- `agreements` - Digital signatures
- `contact_messages` - Lead management

## File Structure Overview

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── symbols/    # Egyptian SVG symbols
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities and API
server/
├── index.ts           # Express server entry
├── routes.ts          # API endpoints
├── storage.ts         # Database layer
└── db.ts             # Database connection
shared/
└── schema.ts         # Shared types and schemas
```

## API Endpoints

### Client Management
- `GET /api/clients` - List clients
- `GET /api/clients/:id` - Get client by ID
- `GET /api/clients/email/:email` - Get client by email
- `POST /api/clients` - Create new client

### Appointments
- `GET /api/appointments` - List appointments
- `GET /api/appointments/client/:clientId` - Client appointments
- `POST /api/appointments` - Create appointment
- `GET /api/availability/:date` - Check availability

### Agreements
- `GET /api/agreements/client/:clientId` - Client agreements
- `POST /api/agreements` - Create agreement

### Contact
- `POST /api/contact` - Submit contact form

## Production Deployment Options

### 1. Traditional VPS/Server
- Upload files to server
- Install Node.js and PostgreSQL
- Configure nginx as reverse proxy
- Use PM2 for process management

### 2. Platform-as-a-Service (Heroku, Railway, etc.)
- Connect Git repository
- Add PostgreSQL add-on
- Set environment variables
- Deploy automatically

### 3. Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### 4. Serverless (Vercel, Netlify)
- Frontend can be deployed as static files
- Backend needs serverless function adaptation

## Environment Variables

Required for production:
```env
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=production
PORT=5000
```

Optional:
```env
# For email notifications (if implemented)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database**: Use connection pooling and prepared statements
3. **CORS**: Configure for your domain in production
4. **HTTPS**: Always use SSL in production
5. **Rate Limiting**: Implement API rate limiting
6. **Input Validation**: All inputs are validated with Zod schemas

## Performance Optimizations

1. **Frontend**: Vite optimized builds with code splitting
2. **Database**: Indexed queries and connection pooling
3. **Caching**: TanStack Query for client-side caching
4. **Images**: Optimized SVG symbols
5. **Bundle**: Tree-shaking and minification

## Monitoring and Logs

Add logging middleware in production:
```typescript
// In server/index.ts
app.use(morgan('combined'));
```

Consider adding error tracking (Sentry, LogRocket) and performance monitoring.

## Backup and Recovery

Regular database backups:
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Support

For technical questions:
1. Check the comprehensive documentation in `replit.md`
2. Review the README.md for feature overview
3. Examine the TypeScript types in `shared/schema.ts`
4. Test API endpoints using the provided client portal

---

*This guide covers deployment of Iron Dog Strength application as of January 18, 2025*