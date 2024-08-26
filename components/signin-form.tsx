"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { login } from "@/actions/user.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoginSchema } from "@/schemas/login-schema"
import { useRouter } from "next/navigation"
import DiscordLoginButton from "./discord-login-button"
import FacebookLoginButton from "./facebook-login-button"
import GithubLoginButton from "./github-login-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { toast } from "./ui/use-toast"

export default function SignIn({
  setIsOpened,
}: {
  setIsOpened?: (isOpened: boolean) => void
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    const res = await login(data)

    if (res.success) {
      if (setIsOpened) {
        setIsOpened(false)
      }
      router.push("/")
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
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <GithubLoginButton />
          <FacebookLoginButton />
          <DiscordLoginButton />
        </div>
        <div className="flex gap-2 items-center justify-center my-2">
          <div className="w-full h-[0.5px] bg-primary " />
          <span className="text-sm text-gray-500">OR</span>
          <div className="w-full h-[0.5px] bg-primary " />
        </div>
        <p className="text-sm text-center text-gray-500 my-2">
          Sign in with your email and password
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
            <div>
              <Button
                type="button"
                onClick={() => {
                  if (setIsOpened) {
                    // this comes from an intercepted route
                    setIsOpened(false)
                    // i can do a soft navigation to see the modal
                    router.replace("/signup")
                  } else {
                    window.location.replace("/signup") // will cause a full page reload
                  }
                }}
                className="underline text-gray-500 px-0"
                variant={"link"}
              >
                Don{"'"}t have an account? Sign up
              </Button>
            </div>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
