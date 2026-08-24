# NexusTech — Full-Stack E-Commerce Platform

> ✦ **A production-ready, feature-rich Full-Stack E-Commerce Web Application** ✦
>
> ⚡ built with **Node.js, Express REST API backend, persistent database storage, modern React (Vite) frontend, interactive checkout pipeline, and a full Admin Operations Dashboard.** 🚀
>
> **`Build. Explore. Experience.`** ✨

---

## 🌐 Live Demo

🔗 **[Visit NexusTech Live](https://ecommerce-store-h1ra.onrender.com)**

---

## 🚀 Project Highlights

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

## ✨ Core User Experience

* 🛍️ **Product Discovery** — Browse, search, filter, sort, and explore featured products with real-time stock availability.
* 🛒 **Smart Shopping Cart** — Manage quantities with instant subtotal, discount, tax, shipping, and total calculations.
* 💳 **Interactive Checkout** — Complete customer and shipping details, select a payment method, and place orders through the REST API.
* 📦 **Order & Inventory Flow** — Orders receive unique tracking IDs and automatically update product inventory.
* 📊 **Admin Operations** — Monitor store performance, manage products and inventory, and update order delivery statuses.
* 📱 **Responsive Experience** — Modern Glassmorphism interface designed for desktop, tablet, and mobile screens.

---

---

## 🌟 Project Status

🚧 **Actively Developed & Continuously Improved**

💡 Built as a practical full-stack project to strengthen real-world development skills.

📌 **Current Focus:** Clean architecture • Better UX • Scalable features • Continuous learning

---

<p align="center">
  💙 <strong>Built with curiosity, consistency, and a passion for web development.</strong>
</p>

<p align="center">
  ⭐ <strong>Thanks for visiting NexusTech!</strong>
</p>

