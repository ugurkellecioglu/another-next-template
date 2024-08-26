"use client"

import { updateUser } from "@/actions/user.actions"
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
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function EditUserModal() {
  const { selectedUser, isUpdateUserModalOpen, setIsUpdateUserModalOpen } =
    useUpdateUserModalStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString() || ""

    if (selectedUser) {
      await updateUser({
        id: selectedUser.id,
        name,
      }).then(() => {
        setIsUpdateUserModalOpen(false)
      })
    }
  }

  return (
    <Dialog
      open={isUpdateUserModalOpen}
      onOpenChange={setIsUpdateUserModalOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <div />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3 space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedUser?.name}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="created-at" className="text-right">
                Created At
              </Label>
              <div className="col-span-3">
                <p className="text-sm text-muted-foreground">
                  {selectedUser?.createdAt}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
