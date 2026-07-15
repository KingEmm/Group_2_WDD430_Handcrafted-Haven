# Group_2_WDD430_Handcrafted-Haven

# Handcrafted Haven 🎨✨

**Handcrafted Haven** is a collaborative web application designed to connect local artisans with customers who appreciate unique, high-quality, handmade products. Developed as part of the WDD 430 course at BYU-Idaho, this platform offers role-based access for both Sellers (Artisans) and Customers to streamline listing, browsing, and buying hand-made goods.

---

## 👥 Group Collaborators
*   **Israel Ayomikun Asimi** (W03 Group Leader)
*   **Emmanuel Kingsley Okafor**
*   **Andrew Chigozie Awadike**
*   **Ariane Guadalupe Arias Peralta**
*   **Asmamaw Yesgat Dinku**

---

## 📅 W02 Meeting Summary

*   **Date:** July 9, 2026
*   **Opening Prayer:** Emmanuel Kingsley Okafor
*   **Closing Prayer:** Andrew Chigozie Awadike
*   **Next Meeting:** July 15, 2026 (Led by Israel Ayomikun)

### Key Discussion Points & Outcomes:
*   **User Roles:** Agreed on implementing two primary user roles: **Seller/Artisan** and **Customer/User**.
*   **Authentication Flow:** Andrew proposed a secure JWT/session-based authentication flow covering registration, login, logout, and role-based route protection.
*   **UI/UX Layout:** Approved Emmanuel's desktop and mobile landing page wireframes.
*   **Tech Stack Alignment:** The team agreed to use the approved wireframes/mockups as the definitive reference for front-end development, incorporating Tailwind CSS.

---

## 🎨 Design System

We chose a premium, rustic, and elegant color scheme paired with highly readable typography to evoke an artisan, high-end feel.

### Color Palette

| Element | Color Name | Hex Code | Preview |
| :--- | :--- | :--- | :---: |
| **Primary** | Rich Charcoal | `#14110F` | `⬛ #14110F` |
| **Secondary** | Warm Ivory | `#F6F2EC` | `⬜ #F6F2EC` |
| **Accent** | Antique Gold | `#B88A4A` | `🟨 #B88A4A` |
| **Primary Text** | Espresso | `#2C241F` | `🟫 #2C241F` |
| **Secondary Text** | Stone Gray | `#766B63` | `🩶 #766B63` |
| **Borders** | Soft Beige | `#DDD3C6` | `🏻 #DDD3C6` |

### Typography
*   **Headings:** `Cormorant Garamond` (gives a premium, elegant, and classic artisan feel).
*   **Body / Navigation / Buttons:** `Inter` (ensures excellent readability and a clean, modern user experience).

---

## 📋 Initial Backlog & User Stories

Below are the 10 core user stories brainstormed and mapped out for our initial kanban planning.

### 1. User Registration
> **As a** visitor  
> **I want to** create an account  
> **So that** I can purchase products and leave reviews.

*   **Acceptance Criteria:**
    *   User can enter name, email, and password.
    *   The email address must be unique in the database.
    *   Passwords must be securely hashed prior to storage.
    *   The user is redirected to the login or welcome screen after successful registration.

### 2. User Login
> **As a** registered user  
> **I want to** log in  
> **So that** I can access my account features.

*   **Acceptance Criteria:**
    *   Form validates input credentials (email/password).
    *   Invalid credentials trigger a helpful error message.
    *   A secure JWT/session is established upon validation.
    *   User is redirected to their dashboard.

### 3. User Logout
> **As a** logged-in user  
> **I want to** log out  
> **So that** my account remains secure on shared devices.

*   **Acceptance Criteria:**
    *   The user session is completely destroyed on the server.
    *   Local cookies/tokens are cleared from the browser.
    *   User is securely redirected to the public home page.

### 4. Password Reset
> **As a** user who forgot their password  
> **I want to** reset my password  
> **So that** I can regain access to my account.

*   **Acceptance Criteria:**
    *   User can request a reset link via email.
    *   System generates a secure, single-use reset token.
    *   The link/token automatically expires after a designated time limit.
    *   User can securely update their password via the token link.

### 5. Role-Based Access Control (RBAC)
> **As an** Artisan  
> **I want to** have exclusive access to seller tools  
> **So that** customers cannot modify or delete my product listings.

*   **Acceptance Criteria:**
    *   Customers are blocked from accessing artisan dashboards or backend endpoints.
    *   Artisan pages are protected via auth-guards.
    *   Unauthorized users are cleanly redirected with an "Access Denied" notice.

### 6. Add Product
> **As an** Artisan  
> **I want to** create a new product listing  
> **So that** customers can discover and purchase it.

*   **Acceptance Criteria:**
    *   Ability to upload product images.
    *   Required input fields: Title, Description, Price, Category, and Stock Quantity.
    *   Data successfully commits to the database.

### 7. Edit Product
> **As an** Artisan  
> **I want to** update my existing product information  
> **So that** my listings remain accurate.

*   **Acceptance Criteria:**
    *   Ability to edit any field of an existing product.
    *   Changes save cleanly to the database.
    *   Maintains an updated timestamp.

### 8. Delete Product
> **As an** Artisan  
> **I want to** delete products that are no longer available  
> **So that** my storefront remains clean.

*   **Acceptance Criteria:**
    *   Presents a confirmation dialog to prevent accidental clicks.
    *   Completely removes the product from the active store feed.
    *   Existing reviews are gracefully handled (archived or cascading deletion).

### 9. Browse Products
> **As a** visitor  
> **I want to** browse listings on the homepage  
> **So that** I can discover unique handmade items.

*   **Acceptance Criteria:**
    *   Displays products cleanly in responsive card layouts.
    *   Features smooth pagination or infinite scroll.
    *   Responsive layout works flawlessly across mobile, tablet, and desktop screens.

### 10. Product Details View
> **As a** customer  
> **I want to** view detailed product information  
> **So that** I can see item photos, descriptions, stock limits, and customer reviews before buying.

*   **Acceptance Criteria:**
    *   Displays high-resolution product images.
    *   Renders complete descriptions, pricing, and live inventory stock.
    *   Includes a section for customer reviews and related products.
