# 📐 DEVELOPMENT PHASES

## PROJECT MIGRATION + STACK ALIGNMENT

### OBJECTIVE

Refactor and align the entire project to the approved technology stack while preserving the current frontend design, layouts, styling, animations, component hierarchy, and user experience.

The existing UI must remain visually identical unless a change is explicitly required by the PRD.

---

# 🔒 GLOBAL RULES (APPLIES TO ALL PHASES)

## Stack Enforcement

Use ONLY:

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Next.js API Routes
* Next.js Server Actions

### Database

* Supabase PostgreSQL (Free Tier)

### Authentication

* Supabase Auth (Free Tier)

### Media Storage

* Cloudinary (Free Tier)

### Payments

* Paystack

### PDF Generation

* Next.js compatible PDF library

### Hosting

* Vercel (Free Tier)

---

## Forbidden Technologies

Remove or avoid:

* Firebase
* Firestore
* Firebase Auth
* Express.js
* React Router
* Vite routing architecture
* Google Cloud Run
* Local file storage
* Local media persistence

---

## UI Preservation Rules

DO NOT:

* Change homepage layout
* Change homepage hero design
* Change homepage sponsor section design
* Change article layouts
* Change gallery layouts
* Change participant layouts
* Change navigation design
* Change typography
* Change color system
* Change animations
* Change spacing unless required for functionality

Maintain existing visual appearance.

---

# PHASE 1 — FOUNDATION & INFRASTRUCTURE

## Objective

Establish project architecture and core services.

### Build

* Next.js App Router structure
* TypeScript configuration
* Tailwind setup
* Framer Motion setup
* Environment configuration
* Supabase integration
* Cloudinary integration
* Paystack integration
* Authentication foundation
* Shared utility architecture

### Create

```txt
/lib
/services
/hooks
/types
/config
/actions
```

### Configure

Environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=
```

### Deliverables

* Project compiles successfully
* Supabase connected
* Cloudinary connected
* Paystack configured
* Auth foundation ready

---

# PHASE 2 — DATABASE ARCHITECTURE

## Objective

Create complete Supabase schema.

### Build Tables

```txt
admins
settings
participants
participant_media
payments
votes
vote_transactions
form_fields
announcements
blog_posts
blog_categories
media_library
gallery_items
hero_banners
sponsors
weekly_rules
general_rules
contact_messages
pdf_records
```

### Requirements

* Foreign keys
* Indexes
* Unique constraints
* Status enums
* Soft delete support where needed

### Deliverables

* Schema fully deployed
* Relationships verified

---

# PHASE 3 — AUTHENTICATION SYSTEM

## Objective

Implement secure admin authentication.

### Build

* Login page
* Session handling
* Middleware protection
* Role validation

### Requirements

Only admins can access:

```txt
/administrator/*
```

### Deliverables

* Secure login
* Protected routes
* Logout functionality

---

# PHASE 4 — SETTINGS ENGINE

## Objective

Create central configuration system.

### Features

Registration:

```txt
Open
Closed
```

Voting:

```txt
Enabled
Disabled
```

Video Upload:

```txt
Visible
Hidden
```

Video Requirement:

```txt
Required
Optional
```

### Deliverables

* Settings dashboard
* Runtime configuration loading

---

# PHASE 5 — DYNAMIC FORM BUILDER

## Objective

Build admin-controlled registration form system.

### Features

Admin can:

* Add field
* Edit field
* Delete field
* Reorder field
* Assign step
* Mark required
* Enable/disable field

### Deliverables

* Dynamic rendering
* Multi-step support

---

# PHASE 6 — MEDIA LIBRARY SYSTEM

## Objective

Create centralized Cloudinary media management.

### Upload Sources

Admin can upload:

* Device
* Cloudinary library
* URL

### Supported

Images:

```txt
jpg
png
webp
```

Videos:

```txt
mp4
```

### Deliverables

* Cloudinary integration
* Media library manager

---

# PHASE 7 — REGISTRATION SYSTEM

## Objective

Build complete participant registration flow.

### Flow

1. Load dynamic form
2. Complete steps
3. Validate
4. Upload media
5. Create payment
6. Redirect Paystack

### Deliverables

* Fully functional registration

---

# PHASE 8 — PAYMENT ENGINE

## Objective

Implement secure Paystack processing.

### Requirements

Webhook-driven verification only.

### Registration

```txt
pending
success
failed
```

### Voting

```txt
pending
success
failed
```

### Deliverables

* Secure webhook processing
* Idempotency protection

---

# PHASE 9 — PARTICIPANT MANAGEMENT

## Objective

Create participant lifecycle system.

### Status Flow

```txt
registered
paid
auditioned
qualified
evicted
```

### Admin Actions

* Approve
* Reject
* Qualify
* Evict
* Delete

### Deliverables

* Full participant manager

---

# PHASE 10 — PDF GENERATION

## Objective

Generate participant documents.

### Registration PDF

Include:

* Event name
* Participant name
* ID
* Image
* Date
* Contact info

### Deliverables

* Downloadable PDFs

---

# PHASE 11 — HOMEPAGE SYSTEM

## Objective

Connect homepage to dynamic data.

### Preserve Existing Design

Do not redesign.

### Hero Logic

```txt
Voting Enabled
    → Show Voting Widget

Else Registration Open
    → Show Registration Form

Else
    → Show Registration Closed Message
```

### Deliverables

* Dynamic homepage

---

# PHASE 12 — BLOG SYSTEM

## Objective

Create complete content management.

### Features

* Create
* Edit
* Delete
* Publish
* Unpublish
* Feature article

### Deliverables

* Blog management
* Public blog pages

---

# PHASE 13 — ANNOUNCEMENT SYSTEM

## Objective

Homepage announcement management.

### Deliverables

* CRUD announcements
* Homepage integration

---

# PHASE 14 — GALLERY SYSTEM

## Objective

Build media showcase.

### Features

* Images
* Videos
* YouTube embeds
* Lightbox

### Deliverables

* Public gallery

---

# PHASE 15 — PARTICIPANTS SHOWCASE

## Objective

Build public participant experience.

### Include

Weekly:

* 1st Performer
* 2nd Performer
* 3rd Performer

Then:

* Remaining participants grid

### Deliverables

* Public participant pages

---

# PHASE 16 — PARTICIPANT PROFILE SYSTEM

## Objective

Create participant detail pages.

### Display

* Biography
* Gallery
* Videos
* Votes
* Ranking
* Status

### Deliverables

* Full participant profiles

---

# PHASE 17 — RULES SYSTEM

## Objective

Create rules management.

### Sections

* Weekly Rules
* General Rules
* Terms & Conditions

### Deliverables

* Editable rules system

---

# PHASE 18 — ABOUT & CONTACT

## Objective

Build informational pages.

### Include

* Organizer information
* Developer information
* Contact form
* Social links

### Deliverables

* About page
* Contact page

---

# PHASE 19 — VOTING SYSTEM

## Objective

Build monetized voting engine.

### Flow

1. Select participant
2. Enter quantity
3. Calculate total
4. Pay
5. Verify
6. Increment votes

### Deliverables

* Fully functional voting

---

# PHASE 20 — DASHBOARD ANALYTICS

## Objective

Dashboard metrics.

### Show

* Total participants
* Qualified participants
* Payments
* Votes

### Deliverables

* Dashboard overview

---

# PHASE 21 — DEVELOPER BADGE

## Objective

Global developer branding component.

### Requirements

* Bottom-right fixed
* Visible on all pages
* Clickable
* Mobile responsive
* Must not block interactions

### Deliverables

* Global badge component

---

# PHASE 22 — FINAL QA & PRODUCTION HARDENING

## Verify

* Authentication
* Registration
* Uploads
* Payments
* PDFs
* Voting
* CMS
* Dashboard
* Settings
* Security
* Mobile responsiveness

## Final Requirement

No feature proceeds to the next phase until the current phase is fully implemented, tested, and verified against the PRD.
