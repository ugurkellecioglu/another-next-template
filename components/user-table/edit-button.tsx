"use client"

import { useUpdateUserModalStore } from "@/store/update-user-modal-store"
import { Button } from "../ui/button"

export default function EditButton({ user }: { user: any }) {
  const { setSelectedUser, setIsUpdateUserModalOpen } =
    useUpdateUserModalStore()
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        console.log(user)
        setSelectedUser(user)
        setIsUpdateUserModalOpen(true)
      }}
    >
      Edit
    </Button>
  )
}
