"use client"

import { useUpdateUserModalStore } from "@/store/update-user-modal-store"
import { Button } from "../ui/button"

export default function DeleteButton({
  user,
}: {
  user: { createdAt: string; name: string; avatar: string; id: string }
}) {
  const { setSelectedUser, setIsDeleteUserModalOpen } =
    useUpdateUserModalStore()
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        setSelectedUser(user)
        setIsDeleteUserModalOpen(true)
      }}
    >
      Delete
    </Button>
  )
}
