# PROJECT AUTHORITY & BUILD INSTRUCTIONS
# This instruction applies to the entire project and must remain active throughout all build phases.

## PROJECT AUTHORITY
The PRD, SRS, approved feature list, database design, workflows, and project structure are the single source of truth.
Do not override, redesign, simplify, replace, or reinterpret any approved requirement without explicit instruction.

## APPROVED TECHNOLOGY STACK
Use ONLY the following stack:
### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes
- Next.js Server Actions

### Database
- Supabase PostgreSQL (Free Tier)

### Authentication
- Supabase Auth (Free Tier)

### Media Storage
- Cloudinary (Free Tier)

### Payments
- Paystack

### PDF Generation
- Next.js compatible PDF library

### Hosting
- Vercel (Free Tier)

## FORBIDDEN TECHNOLOGIES
Do not use:
- Firebase
- Firestore
- Firebase Authentication
- Express.js
- React Router
- Vite routing architecture
- MongoDB
- Google Cloud Run
- Local file storage
- Local media persistence
- Any alternative database
- Any alternative authentication provider
- Any alternative payment provider

## USER INTERFACE PROTECTION RULES
The current frontend design is approved.
Do not redesign, replace, or significantly alter:
- Homepage layout, colors, elements, and precise visual overlapping designs
- Homepage hero section
- Sponsor scrolling section
- Featured articles layout
- Gallery layouts
- Participants layouts
- Blog layouts
- Navigation layouts
- Typography system
- Color system
- Animations
- Visual hierarchy
- Existing component structures
Build functionality behind the existing design.
Only make visual changes when explicitly required by the PRD.

### HOME PAGE PROTECTION MANDATE
- **Absolute Rule**: Do not edit, modify, redesign, or tamper with the layout, design, section overlaps, or colors of the Home Page. It was specially requested and must remain intact across all subsequent phases.
- **Integration**: Verify that any newly integrated features, modules, modal components, or global configurations fit flawlessly and function perfectly without disrupting or modifying the visual presentation of the Home Page.

## BUILD STRATEGY
Build the system feature-by-feature.
Use phases only to determine build order.
Each feature must be:
- Fully implemented
- Fully tested
- Fully debugged
- Fully integrated
before proceeding to the next feature.
Do not partially build a feature.
Do not leave placeholder logic.
Do not skip backend implementation.
Do not skip validation.
Do not skip database integration.

## DATABASE RULES
Use Supabase PostgreSQL only.
Enforce:
- Foreign keys
- Unique constraints
- Relational integrity
- Proper indexing
Store application data in PostgreSQL.
Never store uploaded files in the database.
Only store Cloudinary URLs.

## CLOUDINARY RULES
All uploads must use Cloudinary.
Applies to:
- User uploads
- Admin uploads
- Images
- Videos
- Gallery assets
- Participant media
- Blog media
- Hero banners
- Sponsor logos
Only Cloudinary URLs may be stored in Supabase.
No local file storage.

## ADMIN MEDIA INPUT METHODS
Whenever an admin uploads media, provide all three options:
- Option 1: Upload from device
- Option 2: Select existing media from internal media library
- Option 3: Provide external URL
The system must support all three methods wherever media selection is required.

## PAYMENT RULES
Use Paystack only.
Frontend payment success must never be trusted.
Payment completion must only be confirmed through verified webhook processing.
All payment operations must be idempotent.
Duplicate payment processing must be prevented.
Participant creation must never occur before verified payment.
Vote allocation must never occur before verified payment.

## REGISTRATION RULES
Registration must respect system settings.
If registration is closed:
- Form submission blocked
- Payment initialization blocked
- API submission blocked
Backend enforcement is mandatory.
Frontend checks alone are insufficient.

## VOTING RULES
Voting must respect system settings.
If voting is disabled:
- Voting page hidden
- Voting menu hidden
- Voting APIs blocked
If voting is enabled:
- Voting UI visible
- Voting APIs active
Backend enforcement is mandatory.

## PARTICIPANT VISIBILITY RULES
Only qualified participants may appear publicly.
Public participant pages must never expose:
- Rejected participants
- Evicted participants
- Unqualified participants
Admin interfaces may view all statuses.

## SECURITY RULES
Implement:
- Server-side validation
- Authentication protection
- Authorization checks
- Webhook signature verification
- File validation
- Rate limiting
- Environment variable protection
- Secure session management
Never trust frontend input.

## DEVELOPMENT RULES
Before implementing any feature:
- Verify dependencies exist.
- Verify database requirements exist.
- Verify APIs are defined.
- Verify permissions are defined.
After implementation:
- Run validation tests.
- Run integration tests.
- Verify database operations.
- Verify UI behavior.
- Verify error handling.
Do not proceed until the feature passes verification.

## ERROR HANDLING STANDARD
Use consistent API responses.
Error format:
```json
{
  "error": true,
  "message": "Description"
}
```
Success format:
```json
{
  "success": true,
  "message": "Operation completed"
}
```
Use appropriate HTTP status codes.

## PROJECT STRUCTURE ENFORCEMENT RULES (MASTER PROMPT)
You must follow the predefined enterprise project structure exactly.
No deviation, no restructuring, no renaming, no merging of modules is allowed.

### 🧠 CORE RULE
> All code, features, APIs, UI, and logic MUST be placed in the correct folder according to the official project structure.
> If a location is unclear, you MUST pause and request clarification instead of guessing.

### 📁 STRUCTURE ENFORCEMENT RULES

#### 1. FEATURE-FIRST RULE (MANDATORY)
All development MUST be feature-based.
Correct format: `/features/[feature-name]/`
Each feature must contain ONLY its own:
* API logic
* UI components
* hooks
* services
* types
* validation
* utils

❌ NEVER mix multiple features in one folder
❌ NEVER place feature logic in global folders unless shared utility

#### 2. GLOBAL FOLDER RESTRICTIONS
Only these are allowed for shared logic:
* `/components` → reusable UI only
* `/lib` → shared helpers only
* `/services` → external integrations only
* `/store` → global state only
* `/types` → global types only
* `/config` → system configuration only

❌ Do NOT place business logic here

#### 3. BACKEND LOGIC RULE
All backend logic MUST be placed in `/server/`
Rules:
* Controllers → `/server/controllers`
* Services → `/server/services`
* Middleware → `/server/middleware`

❌ No backend logic in `/features` except feature-specific wrappers

#### 4. DATABASE RULE
All database logic MUST be in `/db/`
Rules:
* Schemas → `/db/schemas`
* Queries → `/db/queries`
* Migrations → `/db/migrations`

❌ No SQL or DB logic anywhere else

#### 5. API ROUTING RULE
All API routes MUST follow `/app/api/`
Rules:
* Each feature owns its own API folder
* Webhooks must be inside `/api/webhook`

❌ No random API files outside this structure

#### 6. UI ROUTING RULE
All pages MUST be in `/app/`
Rules:
* Public pages → `(public)`
* Admin pages → `(auth)` / `(admin)`
* Auth pages → `(auth)` / `(admin)`

❌ No UI inside `/features` except feature components

#### 7. INTEGRATION RULE
External services MUST go to `/services/`
Examples:
* Paystack
* Cloudinary
* PDF generation

❌ Never implement external API logic inside features directly

#### 8. SETTINGS & SYSTEM STATE RULE
All system-wide toggles MUST be in `/config/systemConfig.ts`
Rules:
* Registration state
* Voting state
* Feature flags

❌ No hardcoded system states anywhere else

#### 9. FEATURE ISOLATION RULE (CRITICAL)
Each feature must be:
✔ Independent
✔ Self-contained
✔ Replaceable
✔ Testable alone

❌ No cross-feature direct imports unless through `/lib` or `/services`

#### 10. ABSOLUTE VIOLATION RULE
If any instruction conflicts with structure:
> ALWAYS prioritize structure over convenience
If unsure:
> STOP and request clarification

### 🧠 FINAL EXECUTION RULE
Before writing ANY code:
1. Identify feature
2. Locate correct folder
3. Confirm dependencies
4. Place code ONLY in allowed structure
5. Avoid duplication
6. Follow separation strictly

### ⚡ SHORT VERSION (FOR AI MEMORY)
```txt
Use feature-based architecture strictly.
No logic outside defined folders.
No mixing features.
No guessing folder placement.
Backend, frontend, DB, and services are strictly separated.
Structure overrides convenience.
```

See `/PROJECT_STRUCTURE.md` for full implementation details.

## COMPLETION RULE
No phase may begin until the current phase is:
- Implemented
- Tested
- Debugged
- Verified
- Approved

Maintain strict adherence to the approved PRD, SRS, feature list, workflows, database architecture, and project structure throughout the entire project lifecycle.

