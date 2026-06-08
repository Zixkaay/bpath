# 🏆 PROJECT_BIBLE: Next Billionaire Path - Master Blueprint

This document serves as the Master Technical Instruction Manual for the project. As the AI Assistant, I will use this as my step-by-step guide. 

**Owner Instructions:** To begin building, reply with: *"Execute Phase [X], Task [Y]"*.

---

## 🏗️ PHASE 1: Core Infrastructure & Global Architecture

### Task 1.1: Database Schema & Authentication Setup (Supabase)
* **Database (DB):** 
  * Create `settings` table (registration_open, voting_enabled, featured_items).
  * Create `participants` table (id, name, bio, status: pending/approved/evicted, ranking, media_urls jsonb, vote_count).
  * Create `blog_posts` table (id, title, content, is_featured, image_url).
  * Create `media_library` table (id, name, type, url, source).
* **API/Logic (Logic):** 
  * Setup local `supabase` client connection keys.
  * Define TypeScript interfaces matching the schema.
  * *Security*: Configure Row Level Security (RLS) mock guidelines (Read-only for public, restricted for Admin).
* **UI:** N/A (Backend preparation).

### Task 1.2: Global State Management & Routing Engine
* **Logic:** Initialize React-Router for SPA navigation (replacing Next.js App Router for this Vite environment). 
* **State:** Create Zustand `useAppStore` to sync Supabase data globally (settings, participants preview, admin states).
* **UI:** Setup the `BrowserRouter` structure:
  * Public routes (`/`, `/gallery`, `/blog`, `/about`, `/participant/:id`).
  * Protected Admin routes (`/admin`, `/admin/participants`, etc.).

### Task 1.3: Core Layouts & Developer Badge
* **UI:** 
  * Build `PublicLayout.tsx` (Navbar, Footer).
  * Build `AdminLayout.tsx` (Sidebar matching the "Professional Polish" theme, Topbar).
  * Implement the non-obstructive `DeveloperBadge` component (Fixed bottom-right, z-index: 1000, 0.6 opacity).
* **Logic:** Ensure mobile responsiveness and proper z-index management so the badge never overlaps forms or buttons.

---

## ⚙️ PHASE 2: System Control Engine (Admin Dashboard)

### Task 2.1: Master Dashboard & Global Settings
* **DB/API:** Fetch and mutate the `settings` table.
* **Logic:** Create handlers for toggling boolean states (Registration OPEN/CLOSED, Voting ENABLED/DISABLED).
* **UI:** Build the "System Control Engine" interface using the requested Professional Polish theme. Include bold toggle switches and status badges.

### Task 2.2: Participant Lifecycle & Ranking Manager
* **DB/API:** CRUD operations for the `participants` table.
* **Logic:** 
  * Handlers for updating status (`Pending` -> `Approved` -> `Evicted`).
  * Dropdown logic to assign `Ranking` (1st, 2nd, 3rd Runner). Ensure only one person can hold 1st place at a time.
* **UI:** 
  * Data grid for listing participants. 
  * Detail view for manually updating their ranking, status, and associated JSONB metadata.

### Task 2.3: Admin Media Manager & Blog Manager
* **DB/API:** Insert to `media_library` and `blog_posts`.
* **Logic:** 
  * Setup the 3-choice Media Selector: 1. Cloudinary upload mock (simulate widget), 2. Internal Supabase library, 3. External URL.
  * Validate file extensions and simulate 50MB limits.
* **UI:** 
  * Form for adding/editing News/Blog posts via a clean "Newsroom" admin UI.
  * Media Library gallery inside the admin panel.

---

## 🎨 PHASE 3: Public Facing UI & Dynamic Rendering

### Task 3.1: The Dynamic Home Page (The Shifter)
* **DB/API:** Fetch global settings, featured blog posts, and featured gallery items.
* **Logic:** Evaluate settings to determine what renders in the Right Hero Card: 
  * If `registration_open` == true -> Render Registration multi-step form preview.
  * If `voting_enabled` == true -> Render Voting CTA Interface.
* **UI:** 
  * Left Hero: Event Title & Description.
  * Sponsors Component: Infinite horizontal scroll.
  * Featured News: Image Left / Text Right. 300-word truncation with "Read More" button.
  * Featured Gallery Grid.

### Task 3.2: Participants Gallery (The 3-Tier Hierarchy)
* **DB/API:** Query `participants` table ordered by ranking and vote counts.
* **Logic:** Categorize fetched data into Tier 1 (1st), Tier 2 (2nd & 3rd), Tier 3 (4th+). Map eviction statuses to automatically render "Eliminated" sashes.
* **UI:** 
  * **Tier 1 (Hero):** Massive banner + Watch Button (or Fallback Brand Banner).
  * **Tier 2:** Side-by-side split cards.
  * **Tier 3:** Uniform grid.
  * Participant Profile Page: Modal or overlay showing full stats and videos (Hide vote button if evicted).

### Task 3.3: Blog / Newsroom & About Pages
* **DB/API:** Fetch all `blog_posts`.
* **Logic:** Identify the designated "Front Line" top post.
* **UI:** 
  * **Blog:** Massive featured image for Top Post, uniform list for the rest. Image Left / Text Right.
  * **About Page:** Clean typography. Includes Vision, Mission, Organizer Contacts, and the special Developer Card snippet.

---

## 🚀 PHASE 4: Core Integrations & Complex Logic

### Task 4.1: Dynamic Registration Form Builder
* **DB/API:** Insert registration payload as JSONB into `participants` (Pending status).
* **Logic:** 
  * Parse JSONB step-configuration defined by the Admin.
  * Implement client-side validation.
  * Utilize `localStorage` to save user progress between form steps automatically.
* **UI:** Multi-step wizard UI mapped dynamically from the Admin's JSON configuration. 

### Task 4.2: Voting & Payment Logic (Paystack Verification)
* **DB/API:** Setup an Express.js backend route (`/api/webhook/paystack`) within `server.ts` to simulate edge function capabilities securely.
* **Logic:** 
  * Client requests to buy $N$ votes.
  * Simulate Paystack Checkout flow.
  * Webhook listener verifies `charge.success` event signature.
  * Only increment the `vote_count` in DB *after* the webhook verification is true.
* **UI:** Polished voting modal/checkout screen with clear conversion metrics.

### Task 4.3: Final Quality Assurance & Polish
* **Logic:** System end-to-end tests (state persistence, broken URL fallbacks). Check error boundaries.
* **UI:** Confirm the Professional Polish CSS theme maps perfectly across all pages. Ensure touch targets on mobile are >44px, and z-indexes appropriately layer modals > navbar > badge > content.
