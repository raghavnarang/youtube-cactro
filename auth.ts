import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.force-ssl",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (
        token.expires_at &&
        (token.expires_at as number) >= Date.now() / 1000
      ) {
        return {
          ...session,
          accessToken: token.accessToken,
          expires_at: token.expires_at,
        };
      }

      return session;
    },
  },
});

interface SessionWithToken extends Session {
  accessToken?: string;
}

export async function getToken() {
  const session = (await auth()) as SessionWithToken | null;
  return session?.accessToken;
}
