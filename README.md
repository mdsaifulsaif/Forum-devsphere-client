Live : https://devsphere-ph.netlify.app/

- Client-Side Overview (Frontend)

This is the client-side of a modern Forum web application developed using the MERN stack. The frontend is built with React, focusing on user experience, dynamic content, and clean design. It connects seamlessly with the backend to allow users to post, comment, upvote/downvote, and subscribe for membership.

- Technologies & Libraries Used

| Tech / Library             | Purpose                                                         |
| -------------------------- | --------------------------------------------------------------- |
| **React**                  | Core frontend library                                           |
| **React Router DOM**       | Page-based routing (dashboard, login, forum, etc.)              |
| **Axios**                  | API calls and secured communication with backend                |
| **React Hook Form**        | Efficient form handling and validation                          |
| **React Query (TanStack)** | Server state management and caching for performance             |
| **SweetAlert2**            | Beautiful alert dialogs (e.g., success, error messages)         |
| **React Icons**            | Icon support for UI                                             |
| **Tailwind CSS**           | Utility-first responsive CSS framework                          |
| **DaisyUI** (optional)     | Tailwind component library for prebuilt UI blocks               |
| **React-Select**           | Enhanced select dropdown for tag selection                      |
| **JWT Cookie Auth**        | Secure authentication using cookies from backend                |
| **Stripe (React)**         | Payment integration for membership using secure checkout system |

- Features Implemented

- User Authentication

Login with Google

JWT token-based auth with cookie support

- Forum Posting System

Create post (with title, description, tag)

Limit: 5 posts for non-members

Membership unlocks unlimited posting

- Upvote / Downvote System

React Query-based vote actions

Separate votes collection for scalability

- Dynamic Dashboard

User Dashboard: Profile, post list, become a member

Admin Dashboard: Manage users, posts, roles

- Role-Based Route Protection

PrivateRoute for logged-in users

AdminRoute for admin-only pages

Unauthorized users see 403 Forbidden page

- Membership Payment

Integrated with Stripe for secure payments

- Responsive Design

Tailwind CSS + DaisyUI

Mobile-first, clean layout

- Admin can:

Monitor abuse and inappropriate comments.

Mark a comment report as resolved.

Delete harmful comments to maintain community safety.

- Pages Overview

| Path                     | Description                            |
| ------------------------ | -------------------------------------- |
| `/`                      | Home Page                              |
| `/forum`                 | All forum posts                        |
| `/login`                 | Login page                             |
| `/register` (optional)   | Register page (if implemented)         |
| `/dashboard`             | Protected dashboard (User/Admin based) |
| `/dashboard/addpost`     | Form to add new post                   |
| `/dashboard/payment/:id` | Membership purchase                    |
| `/forbidden`             | 403 Error Page for unauthorized access |
