import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import NextAuth, { User } from "next-auth"
import { encode as defaultEncode } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import Discord from "next-auth/providers/discord"
import Facebook from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"
import Passkey from "next-auth/providers/passkey"
import { v4 as uuid } from "uuid"
import { getUserFromDb } from "./actions/user.actions"
import { db } from "./lib/db"
import {
  accountsTable,
  authenticatorsTable,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from "./lib/schema"

const adapter = DrizzleAdapter(db, {
  accountsTable,
  usersTable,
  authenticatorsTable,
  sessionsTable,
  verificationTokensTable,
})

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials

        const res = await getUserFromDb(email as string, password as string)
        if (res.success) {
          return res.data as User
        }

        return null
      },
    }),
    Passkey,
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true
      }
      return token
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid()

        if (!params.token.sub) {
          throw new Error("No user ID found in token")
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error("Failed to create session")
        }

        return sessionToken
      }
      return defaultEncode(params)
    },
  },
  secret: process.env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
