# FINALIZED FEATURES:
1. User Authentication & Favorite Team Selection
JWT-based login/signup

Users select their favorite teams from supported leagues

Stored in MongoDB under user preferences

2. Upcoming Fixture List (Team-Specific)
Show upcoming 7–10 fixtures per favorite team

Fetched from scraped sources or APIs (daily update via cron)

3. Past Match Scoreboard
Display past 5 matches with full-time score, date, and venue

Scraped from free websites or fetched via public APIs

4. Live Score Updates
Uses polling or WebSocket (if free API allows) to refresh score

Score auto-updates every 30–60 seconds

“Match in Progress” badge with timer

5. Team Match Digest
Daily match summary (e.g., “Barcelona drew 1-1 with Real Betis”)

Generated using scraped results or API data

Sent via frontend (or can be emailed in future versions)

6. Expected Starting Lineups
Scraped from prediction sites like whoscored, sofascore (if possible)

Shows players, formations, and key stats (if available)

7. Notification Dashboard
Shows:

Today’s matches

Ongoing matches

Important upcoming fixtures

Pulls data from daily cron jobs

8. Global Match Search
Search bar to find any club, country, or competition

Displays latest scores or next match

9. Team Performance Trend View
Graph showing win/draw/loss streak (last 10 matches)

Uses Recharts for trend visualization

10. Web Scraping Engine (Backend)
scrape-fixtures, scrape-results, scrape-lineups routes

Puppeteer (for JS-loaded sites) + Cheerio (for static pages)

11. Cron Jobs
Fetch new match data every 24 hours

Update live match data every X seconds (if using polling)

Clean old match data weekly

12. Skeleton Loading for UX
While match data loads, skeleton components show placeholder content

Implemented using Shadcn’s skeleton or custom CSS

13. Dark Mode Toggle
State toggled using RTK

Saves user preference in localStorage

14. Responsive Mobile-First UI
Tailwind CSS or Shadcn ensures full responsiveness

Mobile-friendly navigation bar and compact match views

15. Shareable Match Links
Copy or share link to any match page or team digest

Uses React Router dynamic routes

16. Bookmark Matches
Logged-in users can bookmark a match to “Watch Later”

Bookmarked list stored in MongoDB under user data



# DEVELOPMENT ROADMAP:
📌 PHASE 0: Project Setup & Planning (1 Day)
✅ Goal: Setup project skeletons, initialize repos, and ensure dev tools are ready.

Tasks:

 Create GitHub repo: match-tracker-digest

 Setup client/ with Vite + React + Tailwind + RTK

 Setup server/ with Node.js + Express + MongoDB (Mongoose)

 Create .env.example, .gitignore, README.md files

 Setup Prettier + ESLint for consistent formatting

 Setup MongoDB Atlas & create base schema folders

📌 PHASE 1: Auth & Favorite Team Selection (2–3 Days)
✅ Goal: User signup/login with JWT and select favorite teams

Frontend:

 Auth pages (Login/Register) using Shadcn UI

 Dashboard on login with team selection screen

Backend:

 /api/auth/register, /login routes

 JWT generation & middleware

 User schema: email, password (hashed), favorites (array of team IDs)

Extras:

 Protect routes using JWT on frontend

 Store favorites on selection, redirect to home/dashboard

📌 PHASE 2: Team Fixture & Match Pages (3–4 Days)
✅ Goal: Fetch and display upcoming/past fixtures per favorite team

Frontend:

 Team-specific page: /team/:id

 Display upcoming 7–10 matches

 Display last 5 matches (score, result, date)

Backend:

 /api/fixtures/:teamId and /api/results/:teamId

 Use Cheerio or API to get data (via helper modules)

 Store daily-scraped data in fixtures, results collections

Cron Jobs:

 Daily scrape: update fixtures & results

 Job logs: console.log('Fixtures updated!') for sanity

📌 PHASE 3: Live Score & Digest Generation (4–5 Days)
✅ Goal: Show live scores via polling and generate match digests

Frontend:

 Show “Live” badge with countdown/timer

 Poll every 30–60s (configurable)

 Match Digest card: summary of team’s match today

Backend:

 /api/live/:teamId — fetch live data (poll from API/scrape)

 /api/digest/:teamId/:date — generate summary string

 Store live match in liveMatches with timestamps

Cron:

 Daily digest summary script, stored per user

 Consider future upgrade to send email (just log for now)

📌 PHASE 4: Lineups, Notifications & Trends (4–5 Days)
✅ Goal: Show lineups, today’s match dashboard, and trend graphs

Frontend:

 /dashboard: Show:

Today’s fixtures

Ongoing matches

Important upcoming fixtures

 /team/:id/trends: Show win/draw/loss graph (Recharts)

Backend:

 /api/lineup/:matchId — scrape predicted/actual lineups

 /api/notifications/:userId

 /api/trends/:teamId — return last 10 match outcomes

Cron:

 Store historical match outcomes for graph data

 Update lineups 2 hrs before match (scraping)

📌 PHASE 5: UX Polish + Extras (2–3 Days)
✅ Goal: Final polish, mobile UI, shareable links, bookmarks, etc.

Tasks:

 Dark mode toggle (RTK + localStorage)

 Bookmark match toggle (store in user schema)

 Skeleton loaders during fetch

 Copy/share match digest using navigator API

 Fully responsive UI + mobile navigation bar

📌 PHASE 6: Deployment & QA (1–2 Days)
✅ Goal: Host full stack and test in production

Deployment:

 Deploy frontend on Vercel

 Deploy backend on Render

 Setup environment variables (REACT_APP_API_BASE, etc.)

 Connect to MongoDB Atlas

Testing:

 Manual flow testing: auth → team select → dashboard → digest

 Test API rate limits (if scraping, add backoff/retry logic)

 Add error boundaries (React) and 404 handling

📌 OPTIONAL: Future Enhancements
Feature	Description
Email digests	Send user-specific digest via email (using nodemailer + cron)
Leaderboard	See which teams have most wins in last 10 games
Chrome extension	Show today’s fixtures in a popup
Push notifications	Using service workers or PWA support
Admin dashboard	For managing scraping sources and match logs
