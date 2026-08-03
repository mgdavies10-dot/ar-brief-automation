# Initial Technical Decisions

These are starting decisions, not permission to ignore a better documented alternative. Claude must explain any proposed deviation before implementing it.

## Application architecture
- Production-grade multi-user web application
- Monorepo or clearly governed multi-app repository
- Public website, VYNE OS, Advisor Studio, and shared packages

## Recommended stack
- Frontend and full-stack framework: Next.js with TypeScript
- UI: Tailwind CSS with VYNE-controlled design tokens and accessible components
- Database: PostgreSQL
- Backend platform: Supabase or equivalent production service
- Authentication: secure email authentication with MFA capability
- File storage: private encrypted object storage
- Hosting: Vercel or equivalent
- Transactional email: Resend or equivalent
- PDF generation: server-side branded generation
- Observability: application logs, error monitoring, audit events, and uptime monitoring
- Analytics: privacy-conscious analytics with no leakage of confidential advisor data

## Required environments
- Local development
- Staging with synthetic data
- Production

## Required engineering practices
- Schema migrations
- Seed scripts
- Type-safe data access
- Central validation schemas
- Automated tests
- CI checks
- environment templates
- dependency review
- documented backup and recovery plan

## Production restrictions
- No confidential production data in browser localStorage
- No hard-coded passcodes
- No reliance on hidden UI elements for authorization
- No shared advisor links without identity verification
- No public file URLs for private documents
- No model result without input provenance and version
