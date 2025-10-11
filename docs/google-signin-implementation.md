# Google Sign-In Implementation

## Overview

Google Sign-In has been successfully integrated into the Rocky app, allowing users to authenticate using their Google accounts.

## What Was Implemented

### 1. Dependencies

- Installed `@react-oauth/google` package for Google OAuth integration

### 2. Components Created/Modified

#### New Components:

- **`components/Layout/GoogleOAuthProvider.jsx`**: Wraps the app with Google OAuth context
- **`components/LoginRegisterPage/GoogleSignInButton.jsx`**: Google Sign-In button component
- **`app/api/google-login/route.js`**: API route to handle Google authentication

#### Modified Components:

- **`components/LoginRegisterPage/Login.jsx`**: Added Google Sign-In functionality
- **`app/layout.jsx`**: Wrapped app with GoogleOAuthProvider

### 3. Authentication Flow

1. User clicks "Continue with Google" button
2. Google OAuth popup appears for user authentication
3. After successful authentication, Google returns an ID token
4. ID token is sent to `/api/google-login` endpoint
5. Backend API (`/wp-json/custom/v1/google-login`) verifies the token
6. If verification succeeds, user is logged in and session cookies are set
7. Cart items are migrated from localStorage to server
8. User is redirected to the appropriate page

### 4. Backend Integration

The implementation connects to your WordPress backend endpoint:

- **Endpoint**: `/wp-json/custom/v1/google-login`
- **Method**: POST
- **Payload**: `{ id_token: "..." }`

### 5. Google OAuth Credentials

**Client ID**: `699900977641-9tnb16c0lkeu6acrktirpfu2r90bevhq.apps.googleusercontent.com`

This Client ID is currently hardcoded in `components/Layout/GoogleOAuthProvider.jsx`.

## Configuration

### Recommended: Use Environment Variable

For better security and flexibility, you should move the Google Client ID to an environment variable:

1. Add to `.env.local`:

   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=699900977641-9tnb16c0lkeu6acrktirpfu2r90bevhq.apps.googleusercontent.com
   ```

2. Update `components/Layout/GoogleOAuthProvider.jsx`:
   ```jsx
   const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
   ```

### Google Cloud Console Setup

Make sure your Google OAuth credentials are configured with the correct:

- **Authorized JavaScript origins**: Your domain(s)
- **Authorized redirect URIs**: Your domain(s)

Example:

- `https://myrocky.com`
- `https://www.myrocky.com`
- `http://localhost:3000` (for development)

## Features

### Current Implementation: 

- ✅ Google Sign-In button on login page
- ✅ ID token verification via WordPress backend
- ✅ User authentication and session management
- ✅ Cart migration after login
- ✅ Redirect handling (including cross-sell flows)
- ✅ Error handling with user-friendly messages
- ✅ Loading states during authentication

### User Experience:

- Clean, modern Google Sign-In button with Google branding
- "OR" divider between traditional login and Google Sign-In
- Consistent error and success toast notifications
- Seamless integration with existing login flow

## Error Handling

The implementation handles several error scenarios:

- Invalid or expired ID tokens
- No matching account (user must sign in with email/password first to link account)
- Network errors
- Backend verification failures

## Security Considerations

1. **ID Token Verification**: All token verification happens server-side in WordPress
2. **No Auto-Registration**: Users must have an existing account. Google Sign-In only links to existing accounts
3. **Email Verification**: Backend checks that the Google account email is verified
4. **Session Management**: Uses WordPress cookies for session management

## Testing

To test the implementation:

1. Navigate to `/login-register`
2. Click "Continue with Google"
3. Select a Google account
4. Verify successful login and redirect

## Troubleshooting

### Common Issues:

1. **"No account found" error**

   - User needs to register with email/password first
   - Then they can use Google Sign-In for subsequent logins

2. **OAuth popup blocked**

   - Check browser popup blocker settings
   - Ensure user interaction triggers the login

3. **Token verification fails**
   - Verify backend endpoint is accessible
   - Check WordPress Google Client ID matches frontend
   - Ensure `Google_Client` library is installed in WordPress

## Future Enhancements

Potential improvements:

- One-tap sign-in
- Auto-registration for new Google users
- Account linking UI for existing users
- Remember preferred sign-in method
- Sign in with other providers (Facebook, Apple, etc.)

## Support

For issues or questions:

1. Check browser console for error messages
2. Check server logs for backend errors
3. Verify Google Cloud Console configuration
4. Ensure WordPress plugin has required dependencies
