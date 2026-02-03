import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // 1. SIGN IN: Send Google data to Express
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/google",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image,
                googleId: user.id, // Google's unique ID
              }),
            }
          );

          const data = await response.json();

          if (data.success) {
            // Attach the BACKEND token and ID to the user object temporarily
            // so we can persist it in the JWT callback below
            user.accessToken = data.token;
            user.dbId = data.user._id;
            return true;
          }
          return false; // Login failed on backend
        } catch (error) {
          console.error("Login notification failed", error);
          return false;
        }
      }
      return true;
    },

    // 2. JWT: Persist the Express data into the NextAuth JWT
    async jwt({ token, user }) {
      // 'user' is only available on the very first sign-in call
      if (user) {
        token.accessToken = user.accessToken;
        token.dbId = user.dbId;
      }
      return token;
    },

    // 3. SESSION: Expose the Express data to the React Client
    async session({ session, token }) {
      session.user.id = token.dbId as string; // Use the Express DB ID, not Google's
      session.accessToken = token.accessToken as string; // Expose the Express JWT
      return session;
    },
  },
});