"use client"

import { logout } from "@/actions/user.actions"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"

export default function LogoutButton() {
  const router = useRouter()

  const onLogoutClick = async () => {
    const response = await logout()
    if (response.success) {
      window.location.href = "/signin"
    } else {
      toast(response.message)
    }
  }

  return (
    <>
      <Button onClick={onLogoutClick}>Sign out</Button>
    </>
  )
}
