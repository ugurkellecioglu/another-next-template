"use client"
import SignIn from "@/components/signin-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SigninModal() {
  const router = useRouter()
  const [isOpen, setIsOpened] = useState(true)
  return (
    <Dialog
      defaultOpen={isOpen}
      onOpenChange={(value) => {
        setIsOpened(value)

        if (!value) {
          router.back()
        }
      }}
      open={isOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <SignIn setIsOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  )
}
