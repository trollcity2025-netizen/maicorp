# MaiCorp Website - Complete Client Portal System

## Overview
This is a full-featured client portal system with authentication, order management, chat system, and CEO dashboard.

## Features

### Authentication System (`auth.html`)
- Sign up / Sign in for clients
- Pre-seeded CEO account (kain.towns@maicorp.online)
- Role-based access (CEO vs Client)
- Local storage-based session management

### CEO Dashboard (`dashboard.html`)
- Real-time overview of all submissions and orders
- Contact form submissions management
- Client order tracking
- Direct chat with all clients
- Mark submissions as contacted
- View order details and status

### Client Dashboard (`client.html`)
- View personal orders
- Submit new website orders with pricing calculator
- Direct chat with CEO
- See order status updates

### Pricing Options

**Basic Website - $100 setup / $75/month**
- Up to 3 pages
- Frontend hosting
- Standard design

**5-10 Page App - $200 setup / $150/month**
- 5-10 pages
- Frontend hosting
- Complex layouts

**Large Project (10-40 pages) - $400 setup / $250/month**
- 10-40 pages
- Full application features
- Custom architecture

### Optional Add-ons
- Backend Server Hosting: +$50/month
- Frontend Server Hosting: +$20/month
- Payment Processor Integration: +$100 setup fee

## How It Works

### 1. Authentication
- All users start at `auth.html`
- Sign up with email and password
- CEO account is pre-created: kain.towns@maicorp.online
- Clients can register freely

### 2. CEO Usage
- Log in as CEO → Redirects to `dashboard.html`
- View all submissions in "Submissions" tab
- Filter by status (New, Contacted)
- Mark submissions as contacted
- View all orders in "Orders" tab
- Chat with any client in "Clients" tab

### 3. Client Usage
- After signup/login → Redirects to `client.html`
- View personal orders and status
- Submit new orders with detailed requirements
- Calculate pricing in real-time
- Chat directly with CEO

### 4. Order Process
1. Client selects website type
2. Specifies number of pages, theme, requirements
3. Chooses hosting options
4. System calculates total price
5. Order submitted → CEO notified
6. CEO reviews and updates status

### 5. Chat System
- Real-time messaging stored in localStorage
- CEO can chat with any client
- Clients can chat with CEO
- Message history persists across sessions

## Data Storage

All data is stored in browser localStorage:

- `maicorp_users` - All user accounts
- `maicorp_submissions` - Contact form submissions
- `maicorp_orders` - Website orders
- `maicorp_chats` - Chat messages
- `maicorp_user` - Current logged-in user session

## Default CEO Credentials

- **Email**: kain.towns@maicorp.online
- **Password**: (Set on first login - create account and log in)

## Pages

1. **auth.html** - Authentication (Sign up / Sign in)
2. **dashboard.html** - CEO Admin Dashboard
3. **client.html** - Client Dashboard
4. **index.html** - Landing page
5. **about.html** - About us
6. **services.html** - Services
7. **projects.html** - Portfolio
8. **pricing.html** - Pricing plans
9. **contact.html** - Contact form

## Testing

1. Open `auth.html` in browser
2. Create a test client account
3. Log out
4. Create CEO account using: kain.towns@maicorp.online
5. Log in as CEO
6. View dashboard and test all features

## Key Features Summary

✅ User Authentication (Email + Password)  
✅ Role-Based Access (CEO/Client)  
✅ Order Management System  
✅ Pricing Calculator  
✅ Real-Time Chat System  
✅ Submission Tracking  
✅ CEO Dashboard  
✅ Client Dashboard  
✅ Session Persistence  
✅ Responsive Design  

## Technical Stack

- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- localStorage for data persistence
- No backend required (can be extended with Node.js/Express)

## Future Enhancements

- Backend API integration (Node.js/Express)
- Email notifications
- Database integration (PostgreSQL/MongoDB)
- File upload for order requirements
- PDF generation for invoices
- Payment gateway integration
