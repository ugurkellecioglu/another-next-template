"use server"

import { signIn as signInWithPasskey } from "next-auth/webauthn"

import { signIn, signOut } from "@/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/schema"
import { LoginSchema } from "@/schemas/login-schema"
import { RegisterSchema } from "@/schemas/register-schema"
import { eq } from "drizzle-orm"

import bcryptjs from "bcryptjs"
import { revalidatePath } from "next/cache"
export async function getUserFromDb(email: string, password: string) {
  try {
    const existedUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    })

    if (!existedUser) {
      return {
        success: false,
        message: "User not found.",
      }
    }

    if (!existedUser.password) {
      return {
        success: false,
        message: "Password is required.",
      }
    }

    const isPasswordMatches = await bcryptjs.compare(
      password,
      existedUser.password
    )

    if (!isPasswordMatches) {
      return {
        success: false,
        message: "Password is incorrect.",
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

export async function loginWithDiscord() {
  await signIn("discord", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  })
}

export async function loginWithGithub() {
  await signIn("github", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  })
}
export async function loginWithFacebook() {
  await signIn("facebook", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  })
}
export async function loginWithPasskey() {
  await signInWithPasskey("passkey", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  })
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
    const hash = await bcryptjs.hash(password, 10)

    const [insertedUser] = await db
      .insert(user)
      .values({
        email,
        password: hash,
      })
      .returning({
        id: user.id,
        email: user.email,
      })

    return {
      success: true,
      data: insertedUser,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function logout() {
  try {
    await signOut({
      redirect: false,
    })
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function updateUser({ name, id }: { name: string; id: string }) {
  // PUT request to https://66b2046a1ca8ad33d4f62740.mockapi.io/api/v1/users/:id
  // with the name in the body
  // return the response

  const res = await fetch(
    `https://66b2046a1ca8ad33d4f62740.mockapi.io/api/v1/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  )
  const data = res.json()

  revalidatePath("/")

  return data
}

export async function deleteUser(id: string) {
  // DELETE request to https://66b2046a1ca8ad33d4f62740.mockapi.io/api/v1/users/:id
  // return the response

  const res = await fetch(
    `https://66b2046a1ca8ad33d4f62740.mockapi.io/api/v1/users/${id}`,
    {
      method: "DELETE",
    }
  )
  const data = res.json()

  revalidatePath("/")

  return data
}
