"use server"

import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { LoginSchema } from "@/schemas/login-schema"
import { RegisterSchema } from "@/schemas/register-schema"
import argon2 from "argon2"
import { eq } from "drizzle-orm"

export async function getUserFromDb(email: string, password: string) {
  try {
    const existedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!existedUser) {
      return {
        success: false,
        message: "User not found.",
      }
    }

    if (existedUser.password !== password) {
      // hash compare
      return {
        success: false,
        message: "Password incorrect.",
      }
    }

    return {
      success: true,
      data: existedUser,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    LoginSchema.parse({
      email,
      password,
    })

    console.log("email is ", email)
    const formData = new FormData()

    formData.append("email", email)
    formData.append("password", password)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    return {
      success: true,
      data: res,
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    }
  }
}

export async function register({
  email,
  password,
  confirmPassword,
}: {
  email: string
  password: string
  confirmPassword: string
}) {
  try {
    RegisterSchema.parse({
      email,
      password,
      confirmPassword,
    })
    // get user from db
    const existedUser = await getUserFromDb(email, password)
    if (existedUser.success) {
      return {
        success: false,
        message: "User already exists.",
      }
    }
    const hash = await argon2.hash(password)

    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hash,
      })
      .returning({
        id: users.id,
        email: users.email,
      })

    return {
      success: true,
      data: user,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}