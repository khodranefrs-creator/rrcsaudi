import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/en/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/en/admin")
      const isOnLoginPage = nextUrl.pathname === "/en/admin/login"

      if (isOnDashboard && !isLoggedIn && !isOnLoginPage) {
        return false
      }

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/en/admin", nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
