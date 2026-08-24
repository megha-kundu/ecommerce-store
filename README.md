# NexusTech — Full-Stack E-Commerce Platform

A production-ready, feature-rich **Full-Stack E-Commerce Web Application** built with Node.js, Express REST API backend, persistent database storage, modern React (Vite) frontend, interactive checkout pipeline, and a full Admin Operations Dashboard.

![NexusTech Store Header](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Resume Summary & Project Highlights

Use these bullet points directly in your resume under **Projects**:

- **Full-Stack Architecture**: Engineered a responsive e-commerce web application with a modular **Node.js/Express** REST API backend and an interactive **React + Vite** frontend.
- **RESTful API & Database Integration**: Architected 10+ REST API endpoints with robust CRUD operations, server-side search/filtering/pagination, and persistent JSON/SQLite database storage.
- **State Management & UX**: Built dynamic React context state for real-time cart drawer updates, coupon code discounts, tax calculations, dynamic stock tracking, and instant invoice generation.
- **Admin Management Portal**: Built a dedicated dual-role admin dashboard enabling store managers to monitor live revenue analytics, add/edit inventory, and manage order pipelines.
- **Design System & Aesthetics**: Implemented a responsive Glassmorphism design system using CSS tokens, sleek dark mode aesthetics, dynamic micro-animations, and mobile-first grid layouts.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Lucide Icons, Modern Vanilla CSS (Design Tokens, Glassmorphism)
- **Backend**: Node.js, Express.js, CORS, Middleware Architecture
- **Database**: Persistent File/SQLite Engine (`db.json`) with auto-seeder
- **Tools**: Concurrently (Single command dev server launch), Axios/Fetch API client

```
       +-------------------------------------------------------+
       |                  React Frontend (Vite)               |
       |  (Storefront, Cart Drawer, Checkout, Admin Panel)     |
       +---------------------------+---------------------------+
                                   |
                         HTTP / REST API Calls
                                   |
       +---------------------------v---------------------------+
       |              Node.js + Express Server                 |
       |  /api/products  |  /api/orders  |  /api/admin/stats   |
       +---------------------------+---------------------------+
                                   |
                            Database Queries
                                   |
       +---------------------------v---------------------------+
       |             Persistent Database (db.json)            |
       |     Products (Catalog) | Orders | Categories          |
       +-------------------------------------------------------+
```

---

## 📊 Database Schema

### `Products`
| Field | Type | Description |
|---|---|---|
| `id` | String | Unique Product ID (e.g. `prod-1`) |
| `name` | String | Product name |
| `description` | String | Detailed product specs |
| `price` | Number | Current price ($) |
| `originalPrice` | Number | Pre-discount price ($) |
| `category` | String | Electronics, Audio, Wearables, Accessories |
| `image` | String | Image URL |
| `stock` | Number | Available inventory count |
| `rating` | Number | Rating (1.0 to 5.0) |
| `reviewsCount` | Number | Total customer reviews count |
| `featured` | Boolean | Featured product flag |

### `Orders`
| Field | Type | Description |
|---|---|---|
| `id` | String | Unique Order Tracking ID (e.g. `NX-89412`) |
| `customer` | Object | Name, Email, Shipping Address, Phone |
| `items` | Array | Ordered product details and quantities |
| `pricing` | Object | Subtotal, Tax, Shipping Fee, Discount, Total |
| `payment` | Object | Method (Credit Card, PayPal, UPI), Transaction Status |
| `status` | String | `Pending`, `Processing`, `Shipped`, `Delivered` |
| `createdAt` | String | ISO Timestamp |

---

## 🔌 REST API Endpoints Overview

### Products API
- `GET /api/products` — Fetch all products (supports `?category=`, `?search=`, `?sort=`, `?featured=true`)
- `GET /api/products/:id` — Fetch single product details
- `POST /api/products` — Create new product (Admin)
- `PUT /api/products/:id` — Update existing product details or stock count (Admin)
- `DELETE /api/products/:id` — Delete product (Admin)

### Orders API
- `POST /api/orders` — Place a new customer order (automatically updates product inventory stock)
- `GET /api/orders` — Fetch all customer orders (Admin)
- `GET /api/orders/:id` — Track order by ID
- `PATCH /api/orders/:id/status` — Update order delivery status (Admin)

### Categories & Stats API
- `GET /api/categories` — Fetch all product categories
- `GET /api/admin/stats` — Fetch store metrics (Total Revenue, Total Orders, Low Stock Alerts)

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v16.0 or higher installed)

### 1. Installation
Run the following command in the root folder to install dependencies for both server and client:
```bash
npm run setup
```
*Or install individually:*
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Running Locally
To launch both the Node.js REST API server (Port `5000`) and the Vite React frontend (Port `3000` / `5173`) simultaneously:
```bash
npm run dev
```

Open your browser and navigate to:
- **Frontend App**: `http://localhost:5173` (or `http://localhost:3000`)
- **Backend REST API**: `http://localhost:5000/api/products`

---

## 💡 How to Add to Your Portfolio / VS Code

1. Copy the entire `ecommerce-store` directory to your preferred projects folder or GitHub workspace.
2. Open the folder in **VS Code**: `File -> Open Folder -> ecommerce-store`.
3. Push to GitHub to highlight your full-stack expertise!
