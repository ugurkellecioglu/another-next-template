"use client"

import { signIn } from "next-auth/webauthn"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "./ui/use-toast"

export default function PasskeyLoginButton({ label }: { label?: string }) {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const onClick = async () => {
    // if label exists, meaning it's for sign up
    if (label) {
      if (!emailRef.current?.value) {
        toast({
          description: "Email is required",
          variant: "destructive",
        })
        return
      }

      await signIn("passkey", {
        action: "register",
        email: emailRef.current.value,
      })
        .then((res) => {
          console.log("res", res)
          if (res?.error) {
            toast({
              description: `Error: ${res.error}`,
            })
          } else {
            console.debug("else", res)
            window.location.href = "/"
          }
        })
        .catch((error) => {
          toast({
            description: `Error: ${error}`,
          })
        })
    } else {
      await signIn("passkey", {
        redirect: false,
      })
        .then((res) => {
          console.log(res)
          if (res?.error) {
            toast({
              description: `Error: ${res.error}`,
            })
          } else {
            router.push("/")
          }
        })
        .catch((error) => {
          toast({
            description: `Error: ${error}`,
          })
        })
    }
  }

  return (
    <>
      {label && (
        <>
          <div className="flex gap-2 items-center justify-center my-2">
            <div className="w-full h-[0.5px] bg-primary " />
            <span className="text-sm text-gray-500">OR</span>
            <div className="w-full h-[0.5px] bg-primary " />
          </div>
          <p className="text-sm text-center text-gray-500 my-2">
            Sign up with passkey
          </p>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full"
            ref={emailRef}
          />
        </>
      )}
      <Button onClick={onClick} className="gap-1 w-full">
        {label ? label : "Sign in with Passkey"}
      </Button>
    </>
  )
}
