# Google Authentication Setup

To enable Google authentication in your Apna Counsellor platform, follow these steps:

## 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Add your domain to authorized domains
7. Create OAuth 2.0 Client ID for Web application
8. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

## 2. Environment Variables

Add the following to your `.env.local` file:

\`\`\`env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
\`\`\`

## 3. Production Deployment

For production deployment on Vercel:

1. Go to your Vercel project settings
2. Add the environment variable:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = your Google Client ID

## 4. Security Notes

- Never expose your Google Client Secret in frontend code
- The Client ID is safe to use in frontend (hence NEXT_PUBLIC_)
- Always verify tokens on your backend in production
- Consider implementing proper JWT verification

## 5. Features Included

✅ Google Sign-In button with official Google branding
✅ Automatic user profile creation from Google account
✅ Avatar image from Google profile
✅ Seamless integration with existing auth system
✅ Proper logout handling for Google sessions
✅ Error handling and loading states
✅ Mobile-responsive design

## 6. Testing

For development testing without Google setup:
- The system includes a fallback demo mode
- Click "Continue with Google" to see the demo flow
- Real Google authentication will work once you add the Client ID
