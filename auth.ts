import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "./actions/user.actions"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        if (!user.success) {
          throw new Error(user.message)
        }

        // return user object with the their profile data
        return user.data as User
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
