import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-primary-foreground">{JSON.stringify(session)}</p>
      <LogoutButton />
    </main>
  )
}
