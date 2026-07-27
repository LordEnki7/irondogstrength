# Iron Dog Strength - Complete Backup Restore Instructions

## Backup Information
- **Backup File**: `iron-dog-strength-complete-with-audio-20250721-115152.tar.gz`
- **Created**: January 21, 2025
- **Size**: ~2.9GB
- **Includes**: Complete application code, all multimedia files, audio content, and configuration

## Contents Included
✅ Complete React/TypeScript frontend application
✅ Express.js backend with authentication and database integration
✅ All video files (workout demonstrations, client transformations)
✅ Audio files (Master Cheers' daily motivation message)
✅ Image assets (book cover, coach photos, client progress images)
✅ Database schema and migration files
✅ Configuration files (package.json, tailwind.config.ts, vite.config.ts)
✅ Documentation (README.md, replit.md, deployment guides)

## Prerequisites for Restoration

### System Requirements
- Node.js 18+ or 20+
- NPM package manager
- PostgreSQL database (local or hosted)
- Modern web browser

### Environment Setup
1. **Database**: PostgreSQL instance (Neon, Supabase, or local)
2. **Environment Variables**:
   - `DATABASE_URL` - PostgreSQL connection string
   - Optional: Stripe keys if payment processing needed

## Restoration Steps

### 1. Extract Backup
```bash
tar -xzf iron-dog-strength-complete-with-audio-20250721-115152.tar.gz
cd iron-dog-strength/
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```bash
# Set up your DATABASE_URL environment variable
echo "DATABASE_URL=your_postgresql_connection_string" > .env

# Push schema to database
npm run db:push
```

### 4. Development Server
```bash
npm run dev
```
Access application at: http://localhost:5000

### 5. Production Build (Optional)
```bash
npm run build
```

## Key Features Included

### Authentication System
- Client registration and login
- Admin panel access (password: irondog2025)
- Session management with PostgreSQL

### Multimedia Content
- **Video Gallery**: Workout demonstrations and client progress videos
- **Audio Player**: Master Cheers' daily motivational messages
- **Image Assets**: Professional photos and transformation galleries

### Business Features
- **Appointment Booking**: Calendar system with availability
- **Digital Agreements**: Liability waiver signing
- **Payment Integration**: Stripe-ready (requires API keys)
- **Client Portal**: Progress tracking and appointment management

### Design System
- **Theme**: Light ice blue gradients with Egyptian wellness motifs
- **Responsive**: Mobile-first design with desktop optimization
- **Icons**: Lucide React with custom Egyptian symbols

## Platform Compatibility

### Replit
- Direct import and run with `npm run dev`
- Automatic workflow configuration included

### Vercel/Netlify
- Frontend builds to `dist/public`
- Backend requires Node.js hosting

### Local Development
- Standard Node.js/PostgreSQL setup
- All dependencies included in package.json

## Important Files

### Configuration
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling system
- `drizzle.config.ts` - Database ORM setup

### Application Structure
- `client/` - React frontend
- `server/` - Express.js backend
- `shared/` - TypeScript schemas
- `attached_assets/` - Original multimedia files

### Documentation
- `replit.md` - Project architecture and preferences
- `README.md` - Basic setup instructions
- `DEPLOYMENT_GUIDE.md` - Production deployment steps

## Troubleshooting

### Database Issues
- Ensure `DATABASE_URL` is set correctly
- Run `npm run db:push` to sync schema
- Check PostgreSQL connection permissions

### Asset Loading
- Video/audio files are served from `client/public/`
- Thumbnails generated with FFmpeg are included
- All paths use relative URLs

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist && npm run build`
- Check TypeScript errors: `npx tsc --noEmit`

## Support Information
- **Project**: Iron Dog Strength Fitness Platform
- **Owner**: Master Dessie L. Cheers
- **Email**: train@irondogstrength.com
- **Features**: Complete fitness training platform with multimedia content

## Version History
- **v1.0** (January 21, 2025): Complete platform with audio integration
- **Features Added**: Daily motivation player, authentic video content, enhanced theming

---

**Note**: This backup contains all authentic content including Master Cheers' personal videos and audio messages. All multimedia assets are properly licensed for use within the Iron Dog Strength platform.