# 🍽️ Narf's Diner — React + CSS Version

A modern, dynamic food vendor website built with **React**, **React Router**, and **pure CSS**.  
No TypeScript, no Tailwind, no Firebase — just clean HTML, CSS, and React JS.  
Works perfectly on **GitHub Pages**.

---

## ✨ Features

- 🎨 **Stunning editorial design** — Playfair Display + DM Sans, warm amber palette
- 🏠 **Homepage** — Animated hero, featured dishes, category grid, about section
- 🍜 **Menu page** — Category filtering, live search, item cards with animations
- 🛒 **Order cart** — Slide-in sidebar, quantity controls, checkout flow
- 🔧 **Admin dashboard** — Add / edit / delete items, toggle availability & featured
- 💾 **localStorage persistence** — Menu changes survive page reloads
- 📱 **Fully responsive** — Works on all screen sizes

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run in development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
```
The `dist/` folder is ready to deploy.

---

## 🌐 Deploy to GitHub Pages

### Option A — Manual (simplest)

1. Build the project: `npm run build`
2. Push the `dist/` folder contents to your `gh-pages` branch
3. In GitHub: Settings → Pages → Source → `gh-pages` branch → root

### Option B — GitHub Actions (auto-deploy on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

Then in GitHub: Settings → Pages → Source → **GitHub Actions**

> After deployment, visit: `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## 🔒 Admin Dashboard

Visit `/admin` (or `/#/admin` on GitHub Pages).

**Default credentials:**
- Email: `admin@narfsdiner.com`
- Password: `admin123`

> To change credentials, open `src/pages/Admin.jsx` and update the `handleLogin` function.

Menu changes made in the admin panel are saved to `localStorage` and persist between sessions.

---

## 📁 Project Structure

```
narfs-react/
├── index.html                    # Entry HTML
├── vite.config.js                # Vite config (base: './')
├── src/
│   ├── main.jsx                  # App entry — wraps with HashRouter
│   ├── App.jsx                   # Routes + shared state
│   ├── styles/
│   │   └── global.css            # CSS variables, reset, utilities
│   ├── data/
│   │   └── menuData.js           # Default menu items + categories
│   ├── hooks/
│   │   ├── useMenu.js            # Menu state + localStorage sync
│   │   └── useCart.js            # Cart state management
│   ├── components/
│   │   ├── Navbar.jsx / .css     # Sticky nav with mobile drawer
│   │   ├── MenuCard.jsx / .css   # Individual food item card
│   │   ├── CategoryFilter.jsx / .css  # Horizontal category tabs
│   │   ├── Cart.jsx / .css       # Slide-in order sidebar
│   │   ├── Toast.jsx / .css      # Notification popup
│   │   └── Footer.jsx / .css     # Footer with contact info
│   └── pages/
│       ├── Home.jsx / .css       # Homepage
│       ├── Menu.jsx / .css       # Menu page with filtering
│       └── Admin.jsx / .css      # Admin dashboard + login
└── package.json
```

---

## 🎨 Customise

| What | Where |
|---|---|
| Restaurant name | `index.html`, `Navbar.jsx`, `Footer.jsx` |
| Colours | `src/styles/global.css` → CSS variables |
| Default menu items | `src/data/menuData.js` → `defaultMenuItems` |
| Admin credentials | `src/pages/Admin.jsx` → `handleLogin` |
| Contact info | `src/components/Footer.jsx` |

---

## 📦 Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 (HashRouter) |
| Styling | Pure CSS (no Tailwind) |
| Build | Vite 5 |
| Icons | Lucide React |
| Persistence | localStorage |
| Hosting | GitHub Pages |
