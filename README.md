# 🛒 Click2Cart - MERN E-commerce Platform

Click2Cart is a full-featured e-commerce web application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** that supports **two distinct user roles** with dedicated portals:

- **Customer Portal**: Product browsing, cart, order placement, profile management.
- **Admin Portal**: Product/customer/order management, impersonation, branding controls.
---

## 🔑 Admin Seed Credentials

| Email              | Password   |
|-------------------|------------|
| admin@example.com | admin123   |

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based login for Admin & Customers.
- Secure password hashing using bcrypt.
- Role-based access control.
---

### 👤 Customer Portal (`/`)
- Register, login, manage profile and change password.
- Browse/search/sort products (20 per page).
- Add to cart, place orders with shipping info.
- Track orders and view order history.
- Paypal payment Integration to buy products.

---

### 🛠 Admin Portal (`/admin`)
- **Dashboard Overview**: Total products, customers, orders grouped by status.
- **Product Management**: Full CRUD with image upload, filters, pagination.
- **Customer Management**: View/edit/block/delete, reset password, impersonate users.
- **Order Management**: View/update/delete orders, filter by status/date/customer.
- **Settings**: Upload logo, set brand colors, change fonts, and add custom HTML blocks.

---


├── README.md
└── package.json
