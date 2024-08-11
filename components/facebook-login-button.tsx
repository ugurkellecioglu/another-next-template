"use client"

import { loginWithFacebook } from "@/actions/user.actions"
import { FacebookIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function FacebookLoginButton({
  label = "Sign in with Facebook",
}: {
  label?: string
}) {
  const router = useRouter()

  const onClick = () => {
    loginWithFacebook()
  }

  return (
    <Button onClick={onClick} className="gap-1 w-full">
      <FacebookIcon className="w-4 h-4" />
      {label}
    </Button>
  )
}
