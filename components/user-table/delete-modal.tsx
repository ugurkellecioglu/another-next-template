"use client"

import { deleteUser } from "@/actions/user.actions"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateUserModalStore } from "@/store/update-user-modal-store"
import { FormEvent } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

export default function DeleteUserModal() {
  const { selectedUser, isDeleteUserModalOpen, setIsDeleteUserModalOpen } =
    useUpdateUserModalStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedUser) {
      await deleteUser(selectedUser.id)
      setIsDeleteUserModalOpen(false)
    }
  }

  return (
    <Dialog
      open={isDeleteUserModalOpen}
      onOpenChange={setIsDeleteUserModalOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <div />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6">
            <p>Are you sure you want to delete this user?</p>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">User:</Label>
              <div className="col-span-3">
                <p className="font-medium">{selectedUser?.name}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive">
              Confirm Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
