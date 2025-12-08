# TODO: Fix 404 Error for /api/admin/login

## Changes Made:
- [x] Downgraded Express from ^5.1.0 to ^4.18.2 for stability
- [x] Removed unusual encoding 'utf16le' from dotenv.config() in app.js
- [x] Added error handling around app.listen() and connectDB() calls in app.js
- [x] Removed duplicate connectDB() call
- [x] Added logging for route loading and try-catch around requiring adminRoutes
- [x] Added logging in adminRoutes.js and authController.adminSignup

## Next Steps:
- [ ] Redeploy the application on Render
- [ ] Check Render logs for any startup errors
- [ ] Test the /api/admin/login endpoint on Postman using https://unitree-backend.onrender.com/api/admin/login
- [ ] Ensure environment variables (MONGODB_URI, JWT_SECRET, etc.) are set in Render dashboard
- [ ] If still failing, check if the server is actually running by testing the root endpoint https://unitree-backend.onrender.com/

## Notes:
- The route /api/admin/login is correctly defined in adminRoutes.js and handled by authController.adminLogin
- The 404 error suggests the server is not starting properly on Render
- Express 5.x is beta and may cause issues; downgraded to stable 4.x
- Dotenv encoding was set to 'utf16le' which is unusual; removed it
