# Ecommerce App

Visit on the link: https://mystore-sable-psi.vercel.app/

A modern, full-featured e-commerce application built with React and Firebase. This application provides a seamless shopping experience with user authentication, product browsing, shopping cart management, and order tracking.

## Overview

Ecommerce App is a comprehensive e-commerce platform designed to deliver an intuitive and efficient shopping experience. Built with cutting-edge web technologies, it combines a responsive user interface with robust backend functionality powered by Firebase.

## Features

### User Authentication & Account Management
- **Secure Registration & Login** - User-friendly signup with email and password
- **Password Recovery** - Reset forgotten passwords via email
- **User Profiles** - Manage personal information including name, phone number, and delivery address
- **Account Security** - Firebase Authentication with secure credential handling

### Product Management
- **Product Catalog** - Browse a wide selection of products
- **Detailed Product Pages** - View comprehensive product information
- **Product Search & Filtering** - Find products easily with intuitive search functionality
- **Product Images** - High-quality product imagery powered by Firebase Storage

### Shopping Cart
- **Add to Cart** - Seamlessly add products to your shopping cart
- **Cart Management** - Adjust quantities and remove items
- **Persistent Storage** - Cart data is saved locally and preserved across sessions
- **Real-time Updates** - Instant cart total calculation

### Order Management
- **Checkout Process** - Streamlined, secure checkout experience
- **Order History** - View all past orders and their details
- **Order Tracking** - Track your orders with comprehensive information
- **User-Specific Orders** - View orders associated with your account

### User Experience
- **Responsive Design** - Fully responsive interface that works on all devices
- **Modern UI** - Built with Tailwind CSS for a clean, professional appearance
- **Icon Integration** - Font Awesome icons for enhanced visual communication
- **Toast Notifications** - User-friendly notifications for actions and feedback

## Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **React Router DOM 7** - Client-side routing for navigation
- **React Hook Form** - Efficient form state management
- **Font Awesome 7** - Comprehensive icon library

### Backend & Services
- **Firebase 12** - Backend-as-a-service platform providing:
  - **Authentication** - User account management and security
  - **Firestore Database** - NoSQL database for product and order data
  - **Cloud Storage** - Secure file storage for product images

### Developer Tools
- **ESLint** - Code quality and consistency
- **React Fast Refresh** - Hot module replacement for faster development

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Firebase account with configured credentials

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a `.env.local` file in the project root
   - Add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation header
│   ├── Footer.jsx      # Footer component
│   ├── ProductCard.jsx # Product display card
│   └── ProtectedRoute.jsx # Route protection wrapper
├── pages/              # Page components
│   ├── ProductsPage.jsx       # Products listing
│   ├── ProductDetailPage.jsx  # Single product details
│   ├── CartPage.jsx           # Shopping cart
│   ├── Checkout.jsx           # Checkout process
│   ├── LoginPage.jsx          # User login
│   ├── SignupPage.jsx         # User registration
│   ├── ForgotPasswordPage.jsx # Password recovery
│   ├── MyOrders.jsx           # Order history
│   └── Profile.jsx            # User profile
├── context/            # React Context API providers
│   ├── AuthContext.jsx # Authentication state management
│   └── CartContext.jsx # Shopping cart state management
├── App.jsx            # Main application component
├── firebase.js        # Firebase configuration
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Context & State Management

### AuthContext
Manages user authentication state including:
- User login/signup
- Password reset
- User profile information
- Authentication state persistence

### CartContext
Manages shopping cart state including:
- Adding/removing products
- Cart persistence using localStorage
- Cart total calculations

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` file contains deployment configurations for automatic builds and deployments.

To deploy:
```bash
npm run build
```

## Best Practices

- **Environment Variables** - Keep Firebase credentials in `.env.local` (never commit to version control)
- **Protected Routes** - Sensitive pages are wrapped with `ProtectedRoute` component
- **Local Storage** - Cart data persists across browser sessions
- **Responsive Design** - All pages are mobile-friendly

## Future Enhancements

Potential features for future development:
- Payment gateway integration
- Advanced product filtering and sorting
- Product reviews and ratings
- Wishlist functionality
- Email notifications for orders
- Admin dashboard for product management

## License

This project is part of the React JS Learning.

## Support

For issues or questions, please reach out to the development team or refer to the Firebase documentation for backend-related queries.
