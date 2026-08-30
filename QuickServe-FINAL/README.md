# QuickServe - Final Beginner Hackathon MVP

QuickServe is a simple service-booking web application built with HTML, CSS and JavaScript. It uses LocalStorage for persistence.

## Included
- Customer and Service Provider signup/login
- Separate customer/provider dashboards
- Logout
- Search and category filter
- Six service providers
- Provider details page
- Booking form with date, time, location and description
- Unique booking IDs
- Pending -> Accepted -> In Progress -> Completed workflow
- Reject pending bookings
- One review per completed booking
- SweetAlert2 popups with browser-alert fallback
- Responsive UI
- Local hero slider and service images

## Run
Open the folder in VS Code and use Live Server on `index.html`.

## Test
1. Sign up as Customer.
2. Sign up as Service Provider using a different email.
3. Customer books a service.
4. Provider accepts, starts work, and completes it.
5. Customer submits one review.

## Storage
The project intentionally uses LocalStorage for this beginner hackathon MVP.
To reset test data, open the browser console and run:

`localStorage.clear();`

## AI Declaration
Declare AI tools used during development according to the hackathon submission instructions.
