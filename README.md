### Frontend README (Vue.js/Nuxt.js)

# Tour Booking App - Frontend

This is the frontend for the Tour Booking application built using **Nuxt.js** and **Vue.js**.

### Functionality Overview

- **Home Page**: View available tours and browse the list.
- **Tour Booking**: Select a tour and proceed with the booking process.
- **Ticket Generation**: Once a booking is completed, view the generated ticket.

### Admin Features

- **Tour Management**: Admins can add, edit, or delete tours.
- **Booking Management**: Admins can view all user bookings.
- **Ticket Management**: Admins can access all generated tickets.
- **User Management**: Admins can manage user roles and permissions (Visit `/admin` to see admin links).

### State Management

We use the `useState()` hook from Nuxt for efficient state management across the application.

### API Integration

The frontend communicates with the backend APIs using **Axios** for most requests, and **fetch()** in some cases to leverage Nuxt’s built-in caching.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/felixkpt/tour-booking-nuxt.git
   cd tour-booking-nuxt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure

- **pages/**: Nuxt pages like Home, Tours, Admin.
- **components/**: Reusable components such as tour cards, booking forms.
- **store/**: Vuex store for state management.

### Deployment

Deployed on **Google Cloud Platform** for both frontend and backend.

---

The project uses **GitHub** for version control. Below are the repo links:

- [Frontend Repo](https://github.com/felixkpt/tour-booking-nuxt)
- [Backend Repo](https://github.com/felixkpt/tour-booking-laravel)

---
