"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { register } from "@/actions/user.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { RegisterSchema } from "@/schemas/register-schema"
import { useRouter } from "next/navigation"
import DiscordLoginButton from "./discord-login-button"
import FacebookLoginButton from "./facebook-login-button"
import GithubLoginButton from "./github-login-button"
import PasskeyLoginButton from "./passkey-login-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function SignUpForm({
  setIsOpened,
}: {
  setIsOpened?: (isOpened: boolean) => void
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    const res = await register(data)
    if (res.success) {
      if (setIsOpened) {
        setIsOpened(false)
      }

      router.replace("/signin")
    } else {
      toast({
        description: res.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <GithubLoginButton label="Sign up with Github" />
          <FacebookLoginButton label="Sign up with Facebook" />
          <DiscordLoginButton label="Sign up with Discord" />
          <PasskeyLoginButton label="Sign up with Passkey" />
        </div>
        <div className="flex gap-2 items-center justify-center my-2">
          <div className="w-full h-[0.5px] bg-primary " />
          <span className="text-sm text-gray-500">OR</span>
          <div className="w-full h-[0.5px] bg-primary " />
        </div>
        <p className="text-sm text-center text-gray-500 my-2">
          Sign up with your email and password
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="button"
                onClick={() => {
                  if (setIsOpened) {
                    setIsOpened(false)
                    router.replace("/signin")
                  } else {
                    window.location.replace("/signin")
                  }
                }}
                className="underline text-gray-500 px-0"
                variant={"link"}
              >
                Already have an account? Sign in
              </Button>
            </div>
            <Button type="submit">Sign up</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
