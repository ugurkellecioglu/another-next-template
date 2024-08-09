"use client"

import { loginWithGithub } from "@/actions/user.actions"
import { GithubIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function GithubLoginButton({
  label = "Sign in with Github",
}: {
  label?: string
}) {
  const router = useRouter()

  const onClick = () => {
    loginWithGithub()
  }

  return (
    <Button onClick={onClick} className="gap-1 w-full">
      <GithubIcon className="w-4 h-4" />
      {label}
    </Button>
  )
}
