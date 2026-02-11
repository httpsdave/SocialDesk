# SocialDesk - Routes & Navigation Map

## Application Structure

### Public Routes
- **`/`** - Login Page
  - Login form with email/password
  - "Remember me" checkbox
  - "Forgot password" link
  - **Action Button**: "Login" → Navigates to `/app` (Dashboard)

---

## Protected Routes (Authenticated Area)
All routes under `/app` use the MainLayout component with sidebar navigation.

### Main Navigation (Sidebar)
- **Dashboard** - `/app`
- **Schedule Posts** - `/app/schedule`
- **Analytics** - `/app/analytics`

### Bottom Navigation (Sidebar)
- **Profile** - `/app/profile`
- **Settings** - `/app/settings`
- **Logout** - Returns to `/` (Login page)

---

## Detailed Route Information

### 1. `/` - Login Page
**Purpose**: User authentication  
**Features**:
- Email and password input fields
- Show/hide password toggle
- Remember me checkbox
- Forgot password link (currently non-functional)

**Buttons & Navigation**:
- **Login Button** → Redirects to `/app` (Dashboard)

---

### 2. `/app` - Dashboard (Main View)
**Purpose**: Overview of all social media accounts and metrics  
**Features**:
- 4 stats cards: Total Followers, Total Engagement, Comments, Avg. Growth
- Weekly growth line chart
- Connected accounts list (Facebook, TikTok, Instagram)
- Recent activity feed
- Quick actions section

**Buttons & Navigation**:
- **"Add Account"** button → Navigates to `/app/add-account`
- **"Schedule New Post"** button → Navigates to `/app/schedule`
- **"View Full Analytics"** button → Navigates to `/app/analytics`
- Platform cards in connected accounts section (currently non-functional)

**Connected Accounts Displayed**:
- Facebook (@yourbrand - 25.4K followers)
- TikTok (@yourbrand - 12.8K followers)  
- Instagram (@yourbrand - 7.0K followers)

**Recent Activity Status**:
- Success (green) - Posted successfully
- Scheduled (blue) - Queued for posting
- Failed (red) - Post failed

---

### 3. `/app/schedule` - Post Scheduling
**Purpose**: Create and manage scheduled social media posts  
**Features**:
- List of scheduled posts with status indicators
- New post creation form
- Platform selection (Facebook, Instagram, TikTok, Twitter)
- Date & time picker
- Media type indicators (image/video)

**Buttons & Navigation**:
- **"+ New Post"** button → Opens post creation form
- **"Create Post"** button → Saves new scheduled post (stays on page)
- **"Cancel"** button → Closes creation form
- **Delete icon** on each post → Shows delete confirmation modal
- Each scheduled post shows: content, platforms, date/time, status

**Post Status Types**:
- Scheduled (blue) - Queued for future posting
- Published (green) - Successfully posted
- Failed (red) - Post failed

---

### 4. `/app/analytics` - Analytics & Insights
**Purpose**: Detailed analytics and performance metrics  
**Features**:
- Weekly growth line chart (multi-platform comparison)
- Engagement metrics bar chart (likes, comments, shares)
- Platform distribution pie chart
- Top performing posts list
- Performance metrics cards

**Buttons & Navigation**:
- **Date range selector** (dropdown, currently non-functional)
- **Export button** (currently non-functional)
- Top posts cards (currently non-functional)

**Metrics Displayed**:
- Total Views
- Average Engagement Rate
- Best Performing Day
- Growth trend indicators (up/down arrows with percentages)

**Charts**:
1. Weekly Growth (Line chart) - Facebook, Instagram, TikTok comparison
2. Engagement Metrics (Bar chart) - Likes, Comments, Shares by day
3. Platform Distribution (Pie chart) - Follower distribution across platforms

---

### 5. `/app/settings` - Application Settings
**Purpose**: Configure app preferences and account settings  
**Features**:
- Notification settings (Email, Push, Weekly reports, Post reminders)
- Privacy settings (Profile visibility, Email visibility, Analytics)
- Appearance settings (Theme, Language, Timezone)
- Security settings (2FA, Login alerts)

**Buttons & Navigation**:
- **"Save Settings"** button → Shows save confirmation modal
- Toggle switches for all settings
- Dropdown selectors for theme, language, timezone

**Settings Categories**:
1. **Notifications** (4 toggle options)
2. **Privacy & Data** (3 toggle options)
3. **Appearance** (Theme: light/dark, Language, Timezone dropdowns)
4. **Security** (2FA toggle, Login alerts toggle)

---

### 6. `/app/profile` - User Profile
**Purpose**: Manage personal information and view account stats  
**Features**:
- Profile avatar with cover photo
- Personal information form
- Account statistics
- Social media links

**Buttons & Navigation**:
- **Camera icon** on cover photo → Upload new cover (currently non-functional)
- **Camera icon** on avatar → Upload new photo (currently non-functional)
- **"Save Changes"** button → Shows save confirmation modal
- **"Cancel"** button → Reverts changes

**Profile Information**:
- Name, Email, Phone, Location
- Bio/Description
- Company, Website
- Join date

**Stats Displayed**:
- Posts Created (248)
- Total Reach (1.2M)
- Accounts Managed (6)

---

### 7. `/app/add-account` - Add Social Media Account
**Purpose**: Connect new social media accounts  
**Features**:
- Platform cards showing available social networks
- Connection status indicators
- Authorization flow placeholder

**Buttons & Navigation**:
- **"Connect"** button on each platform → Shows connection confirmation modal
- **"Connected" badge** → Shows checkmark for connected platforms
- **"Back to Dashboard"** link/button → Navigates to `/app`

**Available Platforms**:
1. Facebook (Connected)
2. Instagram (Not connected)
3. Twitter/X (Not connected)
4. TikTok (Not connected)
5. LinkedIn (Not connected)
6. YouTube (Not connected)

**Connection Status**:
- Green checkmark badge = Connected
- Gray "Connect" button = Not connected

---

## Common UI Components

### Sidebar Navigation
- Logo/Brand at top
- Main navigation links
- Profile and Settings at bottom
- Logout button
- Mobile hamburger menu (responsive)

### Confirmation Modals
Used throughout the app for:
- Logout confirmation
- Delete post confirmation
- Save settings confirmation
- Save profile confirmation
- Connect account confirmation

**Modal Buttons**:
- **Confirm/Continue** → Executes action
- **Cancel** → Closes modal without action

---

## Current State Notes

### Working Functionality:
✅ Navigation between all routes  
✅ Sidebar navigation (desktop & mobile)  
✅ Form inputs and data collection  
✅ Confirmation modals  
✅ Create/delete scheduled posts (local state)  
✅ Charts and data visualization  
✅ Responsive design  

### Non-Functional (UI Only):
❌ Actual authentication/authorization  
❌ Backend API integration  
❌ Social media OAuth connections  
❌ File uploads (profile/cover photos, post media)  
❌ Actual post publishing to platforms  
❌ Real-time data updates  
❌ "Forgot password" functionality  
❌ Export data functionality  
❌ Search/filter features  

---

## Button Navigation Summary

| Button/Link | Location | Destination |
|-------------|----------|-------------|
| Login | Login page | `/app` |
| Dashboard | Sidebar | `/app` |
| Schedule Posts | Sidebar | `/app/schedule` |
| Analytics | Sidebar | `/app/analytics` |
| Profile | Sidebar | `/app/profile` |
| Settings | Sidebar | `/app/settings` |
| Logout | Sidebar | `/` |
| Add Account | Dashboard | `/app/add-account` |
| Schedule New Post | Dashboard | `/app/schedule` |
| View Full Analytics | Dashboard | `/app/analytics` |
| New Post | Schedule page | Opens form (same page) |
| Save Settings | Settings | Modal (same page) |
| Save Changes | Profile | Modal (same page) |
| Connect Platform | Add Account | Modal (same page) |

---

## Mock Data & Content

All data is currently hardcoded for demonstration:
- User profile: "Sarah Johnson"
- Social accounts: Facebook, TikTok, Instagram
- Follower counts: 45.2K total
- Sample posts and schedules
- Analytics data for past week
- Recent activity feed

This is a **frontend-only** application. All interactions are client-side with no backend persistence.
