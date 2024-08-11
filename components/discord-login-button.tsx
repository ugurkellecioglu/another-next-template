"use client"

import { loginWithDiscord } from "@/actions/user.actions"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function DiscordLoginButton({
  label = "Sign in with Discord",
}: {
  label?: string
}) {
  const router = useRouter()

  const onClick = () => {
    loginWithDiscord()
  }

  return (
    <Button onClick={onClick} className="gap-1 w-full">
      {label}
    </Button>
  )
}
